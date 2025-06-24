import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device } from '../../entities/device.entity';
import { VarlistService } from '../../services/varlist.service';
import { catchError, of, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-varlist',
  standalone: false,
  templateUrl: './varlist.component.html',
  styleUrls: ['./varlist.component.scss']
})
export class VarlistComponent implements OnInit, OnDestroy {
  @Input() loading = false;
  @Input() error: string | null = null;
  @Input() categories: string[] = [];
  @Input() models: Device[] = [];

  @Output() generate = new EventEmitter<{ categoria: string, model: string, auxNumber: string, description: string, device: string, ipAddress: string }[]>();
  @Output() categoryChanged = new EventEmitter<string>();

  protected fb = inject(FormBuilder);
  protected varlistSrv = inject(VarlistService);

  protected destroyed$ = new Subject<void>();

  varlistForm = this.fb.group({
    rows: this.fb.array([])
  });

  // Array di stringhe dei Modelli dei Device per ogni riga
  modelsPerRow: string[][] = [];

  get rows(): FormArray {
    return this.varlistForm.get('rows') as FormArray;
  }

  ngOnInit() {
    this.addRow();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  createRow(): FormGroup {
    const newRow = this.fb.group({
      categoria: ['', Validators.required],
      model: [{ value: '', disabled: true }, Validators.required],
      auxNumber: ['', Validators.required],
      description: [''],
      device: ['', Validators.required],
      ipAddress: ['', [Validators.required, Validators.pattern(/^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/)]]
    });

    const rowIndex = this.rows.length;
    this.modelsPerRow[rowIndex] = [];

    newRow.get('categoria')?.valueChanges.pipe(
      takeUntil(this.destroyed$),
      switchMap(selectedCategory => {
      if (selectedCategory && selectedCategory !== '') {
        this.categoryChanged.emit(selectedCategory);
        return this.varlistSrv.deviceInfo(selectedCategory).pipe(
          catchError(() => {
            this.modelsPerRow[rowIndex] = [];
            newRow.get('model')?.disable();
            return of([] as string[]);
          })
        );
      } else {
        this.modelsPerRow[rowIndex] = [];
        newRow.get('model')?.disable();
        return of([] as string[]);
      }
    })
  ).subscribe((data: string[]) => {
      this.modelsPerRow[rowIndex] = data;
      if (data.length > 0) {
        newRow.get('model')?.enable();
      } else {
        newRow.get('model')?.disable();
      }
      newRow.get('model')?.setValue('');
    });

    return newRow;
  }

  addRow() {
    this.rows.push(this.createRow());
  }

  removeRow() {
    if (this.rows.length > 1) {
      this.rows.removeAt(this.rows.length - 1);
      this.modelsPerRow.splice(this.modelsPerRow.length - 1, 1);
    }
  }

  enableModelControls() {
    this.rows.controls.forEach(row => row.get('model')?.enable());
  }

  disableModelControls() {
    this.rows.controls.forEach(row => row.get('model')?.disable());
  }

  isInvalid(rowIndex: number, controlName: string): boolean {
    const control = this.rows.at(rowIndex).get(controlName);
    return control !== null && control.touched && control.invalid;
  }

  hasRequiredError(rowIndex: number, controlName: string): boolean {
    const control = this.rows.at(rowIndex).get(controlName);
    return control !== null && control.errors?.['required'];
  }

  getErrorMessage(rowIndex: number, controlName: string): string | null {
    const control = this.rows.at(rowIndex).get(controlName);
    if (!control || !control.touched || control.valid) {
      return null;
    }

    if (control.errors?.['required']) {
      return 'Obbligatorio compilare questo campo';
    }

    if (controlName === 'ipAddress' && control.errors?.['pattern']) {
      return 'Indirizzo IP non valido (es. 192.168.1.100)';
    }
    return null;
  }

  onSubmit() {
    // Identifico righe non vuote (almeno un campo compilato)
    const nonEmptyRowsIndices = this.rows.controls
      .map((ctrl, i) => {
        const val = ctrl.value;
        const hasValue = Object.values(val).some(v => v !== null && v !== '');
        return hasValue ? i : -1;
      })
      .filter(i => i !== -1);

    // Resetto lo stato touched prima di validare
    this.varlistForm.markAsUntouched();

    let allValid = true;

    // Validazione solo righe non vuote
    nonEmptyRowsIndices.forEach(i => {
      const row = this.rows.at(i);
      row.markAllAsTouched();
      if (row.invalid) {
        allValid = false;
      }
    });

    if (!allValid) {
      return; // blocca submit se qualche riga non vuota è invalida
    }

    // Emitto solo righe non vuote
    const filteredRows = nonEmptyRowsIndices.map(i => this.rows.at(i).value);
    this.generate.emit(filteredRows);
  }

  resetRows() {
    // Rimuovo tutte le righe eccetto la prima che la svuoto
    while (this.rows.length > 1) {
      this.rows.removeAt(this.rows.length - 1);
      this.modelsPerRow.pop();
    }

    // Svuota e ricrea la prima riga
    this.rows.setControl(0, this.createRow());

    // Pulisco manualmente lo stato del form
    this.varlistForm.markAsUntouched();
    this.varlistForm.markAsPristine();
  }

  // Funzione che mi attiva il bottone Reset solo in caso di più righe o campi compilati
  get isResetDisabled(): boolean {
    const moreThanOneRow = this.rows.length > 1;
    const anyFieldFilled = this.rows.controls.some(ctrl => {
      const val = ctrl.value;
      return Object.values(val).some(v => v !== null && v !== '');
    });

    // Disabilita solo se non ho più righe e non ho campi compilati
    return !(moreThanOneRow || anyFieldFilled);
  }

  // Funzione (proprietà virtuale) che mi attiva il bottone Genera solo in caso di completamente di almeno un campo del form
  get isGenerateDisabled(): boolean {
    return !this.rows.controls.some(ctrl => {
      const val = ctrl.value;
      return Object.values(val).some(v => v !== null && v !== '');
    });
  }
}
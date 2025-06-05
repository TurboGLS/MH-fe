import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device } from '../../entities/device.entity';
import { VarlistService } from '../../services/varlist.service';

@Component({
  selector: 'app-varlist',
  standalone: false,
  templateUrl: './varlist.component.html',
  styleUrls: ['./varlist.component.scss']
})
export class VarlistComponent implements OnInit {
  @Input() loading = false;
  @Input() error: string | null = null;
  @Input() categories: string[] = [];
  @Input() models: Device[] = [];

  @Output() generate = new EventEmitter<{ model: string, auxNumber: string, description: string, device: string, ipAddress: string }[]>();
  @Output() categoryChanged = new EventEmitter<string>();

  protected fb = inject(FormBuilder);
  private varlistSrv = inject(VarlistService);

  varlistForm = this.fb.group({
    rows: this.fb.array([])
  });

  // Array di array di Device per ogni riga
  modelsPerRow: Device[][] = [];

  get rows(): FormArray {
    return this.varlistForm.get('rows') as FormArray;
  }

  ngOnInit() {
    this.addRow();
  }

  createRow(): FormGroup {
    return this.fb.group({
      deviceModel: ['', Validators.required],
      model: [{ value: '', disabled: true }, Validators.required],
      auxNumber: ['', Validators.required],
      description: [''],
      device: ['', Validators.required],
      ipAddress: ['', [Validators.required, Validators.pattern(/^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/)]]
    });
  }

  addRow() {
    const newRow = this.createRow();
    const rowIndex = this.rows.length;

    // Inizializzo modello vuoto per la riga
    this.modelsPerRow[rowIndex] = [];

    newRow.get('deviceModel')?.valueChanges.subscribe(selectedCategory => {
      if (selectedCategory) {
        // Carico i modelli per la categoria selezionata SOLO per questa riga
        this.varlistSrv.deviceInfo(selectedCategory).subscribe({
          next: (data) => {
            this.modelsPerRow[rowIndex] = data;
            newRow.get('model')?.enable();
          },
          error: () => {
            this.modelsPerRow[rowIndex] = [];
            newRow.get('model')?.disable();
          }
        });
      } else {
        this.modelsPerRow[rowIndex] = [];
        newRow.get('model')?.disable();
      }
      // Resetto il valore di model al cambio categoria
      newRow.get('model')?.setValue('');
    });

    this.rows.push(newRow);
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
}
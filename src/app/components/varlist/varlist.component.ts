import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Device } from '../../entities/device.entity';

@Component({
  selector: 'app-varlist',
  standalone: false,
  templateUrl: './varlist.component.html',
  styleUrls: ['./varlist.component.scss']
})
export class VarlistComponent implements OnInit, OnChanges {
  @Input()
  loading = false;

  @Input()
  error: string | null = null;

  @Input()
  categories: string[] = [];

  @Input()
  models: Device[] = [];

  @Output()
  generate = new EventEmitter<{ model: string, auxNumber: string, description: string, device: string, ipAddress: string }>();

  @Output()
  categoryChanged = new EventEmitter<string>();

  protected fb = inject(FormBuilder);

  varlistForm = this.fb.group({
    deviceModel: ['', Validators.required],
    model: ['', Validators.required],
    auxNumber: ['', Validators.required],
    description: [''],
    device: ['', Validators.required],
    ipAddress: ['', [Validators.required, Validators.pattern(/^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/)]]
  });

  ngOnInit() {
    // Inizialmente il campo modello è disabilitato
    this.varlistForm.get('model')?.disable();

    // Quando l'utente seleziona una categoria, emetti l'evento
    this.varlistForm.get('deviceModel')?.valueChanges.subscribe((selectedCategory) => {
      if (selectedCategory) {
        this.categoryChanged.emit(selectedCategory);
      } else {
        this.varlistForm.get('model')?.disable();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['models']) {
      if (this.models.length > 0) {
        this.varlistForm.get('model')?.enable();
      } else {
        this.varlistForm.get('model')?.disable();
      }
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.varlistForm.get(controlName);
    return control !== null && control.touched && control.invalid;
  }

  hasRequiredError(controlName: string): boolean {
    const control = this.varlistForm.get(controlName);
    return control !== null && control.errors?.['required'];
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.varlistForm.get(controlName);
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
    if (this.varlistForm.valid) {
      const formValue = this.varlistForm.value;

      this.generate.emit({
        model: formValue.model!,
        auxNumber: formValue.auxNumber!,
        description: formValue.description!,
        device: formValue.device!,
        ipAddress: formValue.ipAddress!,
      });
    }
    else {
      this.varlistForm.markAllAsTouched();
    }
  }
}
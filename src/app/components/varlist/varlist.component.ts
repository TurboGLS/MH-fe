import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-varlist',
  standalone: false,
  templateUrl: './varlist.component.html',
  styleUrl: './varlist.component.scss'
})
export class VarlistComponent {
  @Input()
  loading = false;

  @Input()
  error: string | null = null;

  @Output()
  generate = new EventEmitter<{ type: string, quantity: number, device: number, ipAddress: string}>();

  protected fb = inject(FormBuilder);

  varlistForm = this.fb.group({
    type: ['', Validators.required],
    quantity: ['', [Validators.required, Validators.min(1)]],
    device: ['', [Validators.required, Validators.min(1)]],
    ipAddress: ['', [Validators.required, Validators.pattern(/^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/)]]
  });

  onSubmit() {
    if (this.varlistForm.valid) {
      const formValue = this.varlistForm.value;

      this.generate.emit({
        type: formValue.type!,
        quantity: Number(formValue.quantity),
        device: Number(formValue.device),
        ipAddress: formValue.ipAddress!,
      });
    }
    else {
      this.varlistForm.markAllAsTouched();
    }
  }
}

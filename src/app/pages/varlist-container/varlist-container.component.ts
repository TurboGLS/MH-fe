import { Component, inject } from '@angular/core';
import { VarlistService } from '../../services/varlist.service';

@Component({
  selector: 'app-varlist-container',
  standalone: false,
  templateUrl: './varlist-container.component.html',
  styleUrl: './varlist-container.component.scss'
})
export class VarlistContainerComponent {
  protected varlistSrv = inject(VarlistService);

  loading = false;
  error: string | null = null;

  onGenerate(event: { type: string, quantity: number, device:number, ipAddress: string }) {
    this.loading = true;
    this.error = null;

    this.varlistSrv.generate(event).subscribe({
      next: (response) => {
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = err.message || 'Errore durante la generazione';
      }
    });
  }
}
import { Component, inject, OnInit } from '@angular/core';
import { VarlistService } from '../../services/varlist.service';
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
import { Device } from '../../entities/device.entity';

@Component({
  selector: 'app-varlist-container',
  standalone: false,
  templateUrl: './varlist-container.component.html',
  styleUrls: ['./varlist-container.component.scss']
})
export class VarlistContainerComponent implements OnInit {
  protected varlistSrv = inject(VarlistService);
  protected router = inject(Router);

  faHouse = faHouse;

  loading = false;
  error: string | null = null;

  categories: string[] = [];
  models: Device[] = [];

  ngOnInit() {
    this.varlistSrv.category().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        this.error = 'Errore nel caricamento delle categorie';
        console.error(err);
      }
    });
  }

  onCategoryChange(category: string) {
    this.models = [];
    this.varlistSrv.deviceInfo(category).subscribe({
      next: (data) => {
        this.models = data;
      },
      error: (err) => {
        this.error = 'Errore nel caricamento dei modell';
        console.error(err);
      }
    })
  }

  onGenerate(event: { model: string, auxNumber: string, description: string, device: string, ipAddress: string }) {
    this.loading = true;
    this.error = null;

    this.varlistSrv.generate([event]).subscribe({
      next: (csvText) => {
        this.loading = false;

        // Creo un blob con il CSV
        const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' });

        // Creo un URL temporaneo e forza il download
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute('download', 'varlist.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.message || 'Errore durante la generazione';
      }
    });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
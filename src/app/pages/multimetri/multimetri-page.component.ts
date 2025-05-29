import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-multimetri-page',
  standalone: false,
  templateUrl: './multimetri-page.component.html',
  styleUrl: './multimetri-page.component.scss'
})
export class MultimetriPageComponent implements OnInit {
  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  @Input()
  selectedMulti: string | null = null;

  ngOnInit(): void {
      // Legge il parametro multi dall'URL
      this.activatedRoute.queryParams.subscribe(params => {
        if (params['multi']) {
          this.selectedMulti = params['multi'];
        }
      });
  }

  selectMulti(item: string) {
    this.selectedMulti = item;

    // Aggiorna l'URL senza ricaricare la pagina
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { multi: item },
      queryParamsHandling: 'merge' // mantiene gli altri parametri  
    });
  }
}
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sxmt63',
  standalone: false,
  templateUrl: './sxmt63.component.html',
  styleUrl: './sxmt63.component.scss'
})
export class SXMT63Component {
  protected router = inject(Router);

  openLink(url: string) {
    window.open(url, '_black');
  }

  goToVarList() {
    this.router.navigate(['/varlist']);
  }
}

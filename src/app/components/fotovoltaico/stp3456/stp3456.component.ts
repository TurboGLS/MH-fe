import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stp3456',
  standalone: false,
  templateUrl: './stp3456.component.html',
  styleUrl: './stp3456.component.scss'
})
export class STP3456Component {
  protected router = inject(Router);

  openLink(url: string) {
    window.open(url, '_blank');
  }

  goToVarList() {
    this.router.navigate(['/varlist']);
  }
}

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stp810',
  standalone: false,
  templateUrl: './stp810.component.html',
  styleUrls: ['./stp810.component.scss']
})
export class STP810Component {
  protected router = inject(Router);
  
  openLink(url: string) {
    window.open(url, '_blank');
  }

  goToVarList() {
    this.router.navigate(['/varlist']);
  }
}

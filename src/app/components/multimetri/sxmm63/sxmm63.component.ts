import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sxmm63',
  standalone: false,
  templateUrl: './sxmm63.component.html',
  styleUrls: ['./sxmm63.component.scss']
})
export class SXMM63Component {
  protected router = inject(Router);
  
  openLink(url: string) {
    window.open(url, '_black');
  }

  goToVarList() {
    this.router.navigate(['/varlist']);
  }
}

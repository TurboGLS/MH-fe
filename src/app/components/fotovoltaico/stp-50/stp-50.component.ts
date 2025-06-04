import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stp-50',
  standalone: false,
  templateUrl: './stp-50.component.html',
  styleUrls: ['./stp-50.component.scss']
})
export class STP50Component {
  protected router = inject(Router);

  openLink(url: string) {
    window.open(url, '_blank');
  }

  goToVarlist() {
    this.router.navigate(['/varlist']);
  }
}

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stp110-60',
  standalone: false,
  templateUrl: './stp110-60.component.html',
  styleUrls: ['./stp110-60.component.scss']
})
export class STP11060Component {
  protected router = inject(Router);

  goToVarList() {
    this.router.navigate(['/varlist']);
  }
}

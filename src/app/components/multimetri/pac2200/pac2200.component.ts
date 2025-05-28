import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pac2200',
  standalone: false,
  templateUrl: './pac2200.component.html',
  styleUrl: './pac2200.component.scss'
})
export class PAC2200Component {
  protected router = inject(Router);

  openLink(url: string) {
    window.open(url, '_black');
  }

  goToVarList() {
    this.router.navigate(['/varlist']);
  }
}

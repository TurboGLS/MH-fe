import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-p21-a000-t',
  standalone: false,
  templateUrl: './p21-a000-t.component.html',
  styleUrls: ['./p21-a000-t.component.scss']
})
export class P21A000TComponent {
  protected router = inject(Router);

  openLink(url: string) {
    window.open(url, '_black');
  }

  goToVarList() {
    this.router.navigate(['/varlist']);
  }
}

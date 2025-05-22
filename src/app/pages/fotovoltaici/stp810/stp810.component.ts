import { Component } from '@angular/core';

@Component({
  selector: 'app-stp810',
  standalone: false,
  templateUrl: './stp810.component.html',
  styleUrl: './stp810.component.scss'
})
export class STP810Component {
  openLink(url: string) {
    window.open(url, '_blank');
  }
}

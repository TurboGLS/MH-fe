import { Component } from '@angular/core';

@Component({
  selector: 'app-sxmm63',
  standalone: false,
  templateUrl: './sxmm63.component.html',
  styleUrl: './sxmm63.component.scss'
})
export class SXMM63Component {
  openLink(url: string) {
    window.open(url, '_black');
  }
}

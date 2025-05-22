import { Component } from '@angular/core';

@Component({
  selector: 'app-sxmt63',
  standalone: false,
  templateUrl: './sxmt63.component.html',
  styleUrl: './sxmt63.component.scss'
})
export class SXMT63Component {
  openLink(url: string) {
    window.open(url, '_black');
  }
}

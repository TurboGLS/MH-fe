import { Component } from '@angular/core';

@Component({
  selector: 'app-pac2200',
  standalone: false,
  templateUrl: './pac2200.component.html',
  styleUrl: './pac2200.component.scss'
})
export class PAC2200Component {
  openLink(url: string) {
    window.open(url, '_black');
  }
}

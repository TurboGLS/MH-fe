import { Component } from '@angular/core';

@Component({
  selector: 'app-stp3456',
  standalone: false,
  templateUrl: './stp3456.component.html',
  styleUrl: './stp3456.component.scss'
})
export class STP3456Component {
  openLink(url: string) {
    window.open(url, '_blank');
  }
}

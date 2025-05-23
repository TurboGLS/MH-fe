import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-multimetri-page',
  standalone: false,
  templateUrl: './multimetri-page.component.html',
  styleUrl: './multimetri-page.component.scss'
})
export class MultimetriPageComponent {
  @Input()
  selectedMulti: string | null = null;
  
  selectMulti(item: string) {
    this.selectedMulti = item;
  }
}
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fotovoltaici-page',
  standalone: false,
  templateUrl: './fotovoltaici-page.component.html',
  styleUrl: './fotovoltaici-page.component.scss'
})
export class FotovoltaiciPageComponent {
  @Input()
  selectedMulti: string | null = null;

  selectMulti(item: string) {
    this.selectedMulti = item;
  }
}

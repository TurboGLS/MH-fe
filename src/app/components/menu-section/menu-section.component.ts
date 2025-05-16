import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-section',
  standalone: false,
  templateUrl: './menu-section.component.html',
  styleUrl: './menu-section.component.scss'
})
export class MenuSectionComponent {
  @Input()
  selectedMenuItem: string | null = null;

  
}

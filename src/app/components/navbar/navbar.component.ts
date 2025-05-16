import { Component, ViewChild } from '@angular/core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  faBars = faBars;
  faTimes = faTimes;

  selectedMenuItem: string | null = null;

  @ViewChild('menuDropdown') menuDropdown!: NgbDropdown;

  onMenuItemClick(item: string) {
    this.selectedMenuItem = item;
    this.menuDropdown.close();
  }
}

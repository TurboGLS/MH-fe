import { Component, inject, ViewChild } from '@angular/core';
import { faBars, faTimes, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  faBars = faBars;
  faTimes = faTimes;
  faUserIn = faUser;
  faUserOut = faRightFromBracket;

  protected authSrv = inject(AuthService);
  protected router = inject(Router);

  selectedMenuItem: string | null = null;

  @ViewChild('menuDropdown') menuDropdown!: NgbDropdown;

  onMenuItemClick(item: string) {
    this.selectedMenuItem = item;
    this.menuDropdown.close();
  }

  onLoginLogoutClick() {
    if (this.authSrv.isLoggedIn()) {
      this.authSrv.logout();
      this.router.navigate(['/home']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }
}

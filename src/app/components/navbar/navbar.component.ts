import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { faBars, faTimes, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  faBars = faBars;
  faTimes = faTimes;
  faUserIn = faUser;
  faUserOut = faRightFromBracket;

  protected authSrv = inject(AuthService);
  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  selectedMenuItem: string | null = null;

  @ViewChild('menuDropdown') menuDropdown!: NgbDropdown;

  onMenuItemClick(item: string) {
    this.selectedMenuItem = item;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { menu: item },
      queryParamsHandling: 'merge'
    });
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

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['menu']) {
        this.selectedMenuItem = params['menu'];
      }
    });
  }
}

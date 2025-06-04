import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { faBars, faTimes, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
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

  isAuthenticated: boolean = false;

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

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['menu']) {
        this.selectedMenuItem = params['menu'];
      }
    });

    this.authSrv.isAuthenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
    });
  }

  onLoginLogoutClick() {
    if (this.isAuthenticated) {
      this.authSrv.logout();
      this.router.navigate(['/home']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }
}

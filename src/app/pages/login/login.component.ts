import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Subject, take, takeUntil, throwError } from 'rxjs';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  protected fb = inject(FormBuilder);
  protected authSrv = inject(AuthService);
  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  protected destroyed$ = new Subject<void>();

  faHouse = faHouse;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  loginError = '';

  requestedUrl: string | null = null;

  ngOnInit() {
    this.loginForm.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(_ => {
        this.loginError = '';
      });

    this.activatedRoute.queryParams
      .pipe(
        takeUntil(this.destroyed$),
        map(params => params['requestedUrl'])
      )
      .subscribe(url => {
        this.requestedUrl = url;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  isLoading = false;

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true; // Inizio caricamento

    const { username, password } = this.loginForm.value;
    this.authSrv.login(username!, password!)
      .pipe(
        take(1),
        catchError(response => {
          this.loginError = response.error.message;
          this.isLoading = false; // Fine caricamento con errore
          return throwError(() => response);
        })
      )
      .subscribe(() => {
        this.isLoading = false; // Fine caricamento
        this.router.navigate([this.requestedUrl ? this.requestedUrl : '/']);
      })
  }

  backToHome() {
    this.router.navigate(['/home']);
  }
}

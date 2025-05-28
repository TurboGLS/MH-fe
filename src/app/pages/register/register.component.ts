import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
  protected fb = inject(FormBuilder);
  protected registerSrv = inject(RegisterService);
  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  protected destroyed$ = new Subject<void>();

  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  registerError = '';

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const userData = this.registerForm.value;

    if (!userData.username || !userData.email || !userData.password) {
      this.registerError = 'Completa tutti i campi';
      return;
    }

    this.registerSrv.register(userData as { username: string; email: string; password: string })
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: res => {
          console.log('Registrazione avvenuta', res);
          this.router.navigate(['/login']);
        },
        error: err => {
          console.error('Errore durante la registrazione', err);

          if (err.error?.message) {
            this.registerError = err.error.message;
          }
          else {
            this.registerError = 'Email o Password non valida'
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

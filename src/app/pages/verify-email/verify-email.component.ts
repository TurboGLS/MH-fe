import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerificationService } from '../../services/verification.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  standalone: false,
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit, OnDestroy {
  protected route = inject(ActivatedRoute);
  protected verificationSrv = inject(VerificationService);
  protected destroyed$ = new Subject<void>();

  @Input() staticMode: boolean = false;
  message: string | null = null;

  ngOnInit() {
    if (this.staticMode) {
      // Mostrato come info dopo la registrazione
      this.message = 'Registrazione completata! Controlla la tua email per verificare l’account.';
      return;
    }

    this.route.queryParams
      .pipe(takeUntil(this.destroyed$))
      .subscribe(params => {
        const token = params['token'];
        if (token) {
          this.message = 'Verifica in corso...';
          this.verificationSrv.verifyEmail(token)
            .pipe(takeUntil(this.destroyed$))
            .subscribe({
              next: () => {
                this.message = 'Email verificata con successo!';
              },
              error: () => {
                this.message = 'Errore nella verifica della email.';
              }
            });
        } else {
          this.message = 'Verifica email in attesa. Controlla la tua casella per il link di conferma.';
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
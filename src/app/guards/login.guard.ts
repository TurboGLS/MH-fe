import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { map, tap } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
  const authSrv = inject(AuthService);
  const router = inject(Router);
  const notifySrv = inject(NotificationService);

  return authSrv.isAuthenticated$
    .pipe(
      tap(isAuthenticated => {
        if (isAuthenticated) {
          notifySrv.setMessage('Impossibile accedere alla pagina Login. Utente già loggato.');
          router.navigate(['/home']);
        }
      }),
      map(isAuthenticated => !isAuthenticated) // consenti accesso solo se NON loggato
    );
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { combineLatest, map, tap } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authSrv = inject(AuthService);
  const router = inject(Router);
  const notifySrv = inject(NotificationService);

  // utilizzo un guard che verificare che l'utente sia loggato per entrare in quella pagina
  // se non lo è lo porto al login, salvando la route che lo porterà dove voleva dopo il login
  return authSrv.isAuthenticated$
    .pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          notifySrv.setMessage('Devi essere loggato per accedere a questa pagina.')
          router.navigate([`/login`], {queryParams: {requestedUrl: state.url}});
        }
      })
    );
};

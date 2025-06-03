import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { combineLatest, map, tap } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authSrv = inject(AuthService);
  const router = inject(Router);
  const notifySrv = inject(NotificationService);

  return authSrv.currentUser$
    .pipe(
      map(user => {
        if (!user) {
          return 'not-logged-in';
        }
        else if (user.role === 'admin') {
          return 'admin';
        }
        else {
          return 'not-authorized';
        }
      }),
      tap(status => {
        if (status === 'not-logged-in') {
          router.navigate(['/login'], {queryParams: {requestedUrl: state.url}});
        }
        else if (status === 'not-authorized') {
          notifySrv.setMessage('Non hai i permessi per accedere a questa pagina.');
          router.navigate(['/home']);
        }
        // Se admin nessuna azione, si lascia passare
      }),
      map(status => status === 'admin') // Passa solo se admin
    );
};

/* Versione vecchia
  // utilizzo un guard che verificare che l'utente sia loggato per entrare in quella pagina
  // se non lo è lo porto al login, salvando la route che lo porterà dove voleva dopo il login
  return authSrv.isAuthenticated$
    .pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          router.navigate([`/login`], {queryParams: {requestedUrl: state.url}});
        }
      })
    );
};
*/
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authSrv = inject(AuthService);
  const router = inject(Router);
  const notificationSrv = inject(NotificationService);

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
          router.navigate(['/login'], { queryParams: { requestedUrl: state.url } });
        }
        else if (status === 'not-authorized') {
          notificationSrv.setMessage('Non hai i permessi per accedere a questa pagina.');
          router.navigate(['/home']);
        }
        // Se è admin, nessuna azione: si lascia passare
      }),
      map(status => status === 'admin') // Passa solo se admin
    );
};
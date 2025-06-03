import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { map, tap } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const authSrv = inject(AuthService);
  const router = inject(Router);
  const notifySrv = inject(NotificationService);

  return authSrv.currentUser$
    .pipe(
      tap(user => {
        if (user && user.role !== 'admin') {
          notifySrv.setMessage('Non hai i permessi per accedere a questa pagina.');
          router.navigate(['/home']);
        }
      }),
      map(user => !!user && user.role === 'admin')
    );
};

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { JwtService } from '../services/jwt.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const jwtSrv = inject(JwtService);
  const router = inject(Router);

  if(jwtSrv.hasToken()) {
    router.navigate(['/home']);
    return false; // blocca l'accesso a /login se è già loggato
  }
  return true; // permette l'accesso a /login se non è loggato
};

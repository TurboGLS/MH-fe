import { HttpInterceptorFn, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { throwError, catchError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { JwtService } from "../services/jwt.service";

export const logoutInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const jwtSrv = inject(JwtService);

  return next(req).pipe(
    catchError((error: any) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};

// da riprendere mi rompe tutto

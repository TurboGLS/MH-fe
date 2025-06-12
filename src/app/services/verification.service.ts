import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  protected http = inject(HttpClient);

  verifyEmail(token: string) {
    return this.http.get(`${environment.apiUrl}/verification/verify-email?token=${token}`);
  }
}

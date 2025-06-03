import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  protected http = inject(HttpClient);
  protected router = inject(Router);

  // richiamo api di registrazione
  register(userData: { username: string, email: string, password: string }) {
    return this.http.post<any>(`${environment.apiUrl}/register`, userData);
  }
}

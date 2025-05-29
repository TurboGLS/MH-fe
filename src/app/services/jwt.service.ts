import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  protected storageKey = 'authToken';

  hasToken() {
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem(this.storageKey);
  }

  setToken(value: string) {
    localStorage.setItem(this.storageKey, value);
  }

  removeToken() {
    localStorage.removeItem(this.storageKey);
  }

  // funzione per controllare se il token è valido e non scaduto
  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return false; // se non c’è exp, consideralo non valido

      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    } catch {
      return false;
    }
  }
}
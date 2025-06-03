import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, distinctUntilChanged, map, of, ReplaySubject, tap } from 'rxjs';
import { JwtService } from './jwt.service';
import { User } from '../entities/user.entity';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected http = inject(HttpClient);
  protected jwtSrv = inject(JwtService);
  protected router = inject(Router);

  protected _currentUser$ = new ReplaySubject<User | null>(1);
  currentUser$ = this._currentUser$.asObservable();

  isAuthenticated$ = this.currentUser$
                       .pipe(
                        map(user => !!user),
                        distinctUntilChanged()
                      );

  constructor() {
    const tokenValid = this.jwtSrv.areTokensValid();
    if (!tokenValid) {
      this.logout();
    } else {
      const user = this.jwtSrv.getPayload<User>();
      this._currentUser$.next(user);
    }
  }

  // richiamo api per effettuare il login
  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/login`, {username, password})
      .pipe(
        tap(res => this.jwtSrv.setToken(res.token, res.refreshToken)),
        tap(res => this._currentUser$.next(res.user)),
        map(res => res.user)
      );
  }

  // richiamo api per effettuare il refresh dei token dopo che verifico se sono presenti i tokens
  refresh() {
    const authTokens = this.jwtSrv.getToken();
    if (!authTokens) {
      throw new Error('Missing refresh token');
    }
    return this.http.post<{token: string, refreshToken: string}>(`${environment.apiUrl}/refresh`, {refreshToken: authTokens.refreshToken})
      .pipe(
        tap(res => this.jwtSrv.setToken(res.token, res.refreshToken)),
        tap(_ => {
          const user = this.jwtSrv.getPayload<User>();
          this._currentUser$.next(user);
        })
      );
  }

  // richiamo api per ottenere le informazioni dell'utente loggato
  fetchUser() {
    return this.http.get<User>(`${environment.apiUrl}/users/me`)
      .pipe(
        catchError(_ => {
          return of(null);
        }),
        tap(user => this._currentUser$.next(user))
      );
  }

  // funzione che rimuove i tokens dal local storage
  logout() {
    this.jwtSrv.removeToken();
    this._currentUser$.next(null);
  }

  // funzione che mi richiama una funzione nel jwtService e che fa un check se i tokens sono presenti
  // quindi se l'utente è ancora loggato e restituise un valore booleano
  isLoggedIn(): boolean {
    return this.jwtSrv.areTokensValid();
  }
}
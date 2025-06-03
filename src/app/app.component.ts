import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from './services/notification.service';
import { Subscription, timer, combineLatest } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  protected authSrv = inject(AuthService);
  protected router = inject(Router);
  protected notifySrv = inject(NotificationService);

  protected timerSubscription?: Subscription;
  message = '';

  wasLoggedIn = false;

  ngOnInit() {
    this.wasLoggedIn = this.authSrv.isLoggedIn();

    // Check del timer ogni 5 minuti
    this.timerSubscription = timer(0, 300000).subscribe(() => {
      // check se l'utente era già loggato prima
      const loggedInNow = this.authSrv.isLoggedIn();

      if (this.wasLoggedIn && !loggedInNow) {
        this.authSrv.logout();
        this.notifySrv.setMessage('Sessione scaduta, effettua nuovamente il login.');
        this.router.navigate(['/login'])
      }
      this.wasLoggedIn = loggedInNow;
    });

    // Gestione messaggi di notifica
    this.notifySrv.message$.subscribe(msg => {
      this.message = msg;
      if (msg) {
        // auto dismiss dopo 4 secondi
        setTimeout(() => this.clearMessage(), 4000);
      }
    });
  }

  clearMessage() {
    this.message = '';
    this.notifySrv.clearMessage();
  }

  ngOnDestroy() {
      this.timerSubscription?.unsubscribe();
  }
}

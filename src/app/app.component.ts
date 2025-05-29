import { Component, inject, OnInit } from '@angular/core';
import { NotificationService } from './services/notification.service';
import { Subscription, timer } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private authSrv = inject(AuthService);
  private router = inject(Router);
  private notificationSrv = inject(NotificationService);

  private timerSubscription?: Subscription;
  message = '';

  wasLoggedIn = false;

  ngOnInit() {
    this.wasLoggedIn = this.authSrv.isLoggedIn();

    this.timerSubscription = timer(0, 300000).subscribe(() => {
      const loggedInNow = this.authSrv.isLoggedIn();

      if (this.wasLoggedIn && !loggedInNow) {
        this.authSrv.logout();
        this.notificationSrv.setMessage('Sessione scaduta, effettua nuovamente il login.');
        this.router.navigate(['/home']);
      }

      this.wasLoggedIn = loggedInNow;
    });

    // Gestione messaggi di notifica
    this.notificationSrv.message$.subscribe(msg => {
      this.message = msg;
      if (msg) {
        // auto dismiss dopo 3 secondi
        setTimeout(() => this.clearMessage(), 3000);
      }
    });
  }

  clearMessage() {
    this.message = '';
    this.notificationSrv.clearMessage();
  }

  ngOnDestroy() {
    this.timerSubscription?.unsubscribe();
  }
}
import { Component, inject, OnInit } from '@angular/core';
import { NotificationService } from './services/notification.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  protected NotificationSrv = inject(NotificationService);
  protected subscription?: Subscription;

  message = '';

  ngOnInit() {
    this.NotificationSrv.message$.subscribe(msg => {
      this.message = msg;

      if (msg) {
        // qui mettiamo l'auto dismiss dopo 3 secondi
        this.subscription?.unsubscribe();
        this.subscription = timer(3000).subscribe(() => this.clearMessage());
      }
    });
  }

  clearMessage() {
    this.message = '';
    this.NotificationSrv.clearMessage();
  }
}
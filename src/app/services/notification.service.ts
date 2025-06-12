import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  protected messageSubject = new ReplaySubject<string>(1);

  message$: Observable<string> = this.messageSubject.asObservable();

  // setting del messaggio
  setMessage(message: string) {
    this.messageSubject.next(message);
  }

  // pulisco la variabile in modo di non creare conflitti in futuro
  clearMessage() {
    this.messageSubject.next('');
  }
}

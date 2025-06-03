import { Injectable } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  protected messageSubject = new Subject<string>();

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

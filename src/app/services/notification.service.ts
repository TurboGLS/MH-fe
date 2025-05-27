import { Injectable } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  protected messageSubject = new Subject<string>();

  message$: Observable<string> = this.messageSubject.asObservable();

  setMessage(message: string) {
    this.messageSubject.next(message);
  }

  clearMessage() {
    this.messageSubject.next('');
  }
}

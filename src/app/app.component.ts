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
export class AppComponent  {
  
}

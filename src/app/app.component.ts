import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { map } from 'rxjs';
import { TestService } from './services/test-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected testSrv = inject(TestService);
  risposta: string = '';

   ngOnInit() {
    this.testSrv.ping().pipe(
      map(res => res.message)
    ).subscribe({
      next: res => {  
        console.log('Risposta backend:', res);
        this.risposta = res;
      },
      error: err => console.error('Errore chiamata:', err)
    });
  }
}
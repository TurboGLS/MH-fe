import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected http = inject(HttpClient);

   ngOnInit() {
    this.pingpong().subscribe({
      next: res => console.log('Risposta backend:', res),
      error: err => console.error('Errore chiamata:', err)
    });
  }

  pingpong() {
    return this.http.get('/api/ping');
  }
}

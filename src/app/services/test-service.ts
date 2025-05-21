import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  protected http = inject(HttpClient);

  ping() {
    return this.http.get<{ message: string }>(`${environment.apiUrl}/ping`);
  }
}

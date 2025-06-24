import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VarlistService {
  protected http = inject(HttpClient);

  // richiamo api per generare il csv
  generate(data: { model: string, auxNumber: string, description: string, device: string, ipAddress: string }[]) {
    return this.http.post(`${environment.apiUrl}/varlist/download`, data, { responseType: 'text' });
  }

  // richiamo api per ottenere le categorie
  category() {
    return this.http.get<any>(`${environment.apiUrl}/device/categoria`);
  }

  // richiamo api per ottere il menu cascade in base alla categoria scelta
  deviceInfo(category: string) {
    return this.http.get<string[]>(`${environment.apiUrl}/device/categoriaInfo?categoria=${category}`);
  }
}

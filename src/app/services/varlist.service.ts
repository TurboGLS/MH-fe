import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Device } from '../entities/device.entity';

@Injectable({
  providedIn: 'root'
})
export class VarlistService {
  protected http = inject(HttpClient);

  // richiamo api per generare il csv
  generate(data: { deviceModel: string, model: string, auxNumber: string, description: string, deviceAddress: string, ipAddress: string }) {
    return this.http.post<any>(`${environment.apiUrl}/varlist/download`, data);
  }

  // richiamo api per ottenere le categorie
  category() {
    return this.http.get<any>(`${environment.apiUrl}/device/categoria`);
  }

  // richiamo api per ottere il menu cascade in base alla categoria scelta
  deviceInfo(category: string) {
    return this.http.get<Device[]>(`${environment.apiUrl}/device/categoriaInfo?categoria=${category}`);
  }
}

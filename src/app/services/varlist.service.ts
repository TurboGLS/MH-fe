import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VarlistService {
  protected http = inject(HttpClient);

  generate(data: { type: string, quantity: number, device: number, ipAddress: string }) {
    return this.http.post<any>(`${environment.apiUrl}/varlist/download`, data);
  }
}

import { Injectable } from '@angular/core';
import { CheckIn } from '../../shared/models/check-in';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const API_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  constructor(private httpClient: HttpClient) { }

  buscarTodos(): Observable<CheckIn[]> {
    return this.httpClient.get<CheckIn[]>(`${API_URL}/check-in`);
  }

  buscarPorData(estadia: 'futuro' | 'presente' | 'passado'): Observable<CheckIn[]> {
    const NOW = new Date();

    return this.httpClient.get<CheckIn[]>(`${API_URL}/check-in`)
      .pipe(
        map(res => res.filter(c => {
          let entrada = new Date(c.dataEntrada);
          let saida = new Date(c.dataSaida);

          switch (estadia) {
            case 'futuro':
              return entrada >= NOW
            case 'presente':
              return entrada <= NOW && saida >= NOW
            case 'passado':
              return saida <= NOW;
          }
        })));
  }

  salvar(checkIn: CheckIn): Observable<any> {
    return this.httpClient.post(`${API_URL}/check-in`, checkIn);
  }
}

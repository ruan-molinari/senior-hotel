import { Injectable } from '@angular/core';
import { CheckIn } from '../../shared/models/check-in';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GlobalConstants } from '../../shared/global-constants';

const API_URL = GlobalConstants.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  constructor(private httpClient: HttpClient) { }

  getByDate(aindaPresentes: boolean): Observable<CheckIn[]> {
    const NOW = new Date();

    return this.httpClient.get<CheckIn[]>(`${API_URL}/check-in`)
      .pipe(
        map(res => res.filter(c => {
          let entrada = new Date(c.dataEntrada);
          let saida = new Date(c.dataSaida);

          return aindaPresentes
            ? entrada <= NOW && saida >= NOW
            : saida <= NOW;
        })));
  }

  save(checkIn: CheckIn): Observable<any> {
    return this.httpClient.post(`${API_URL}/check-in`, checkIn);
  }
}

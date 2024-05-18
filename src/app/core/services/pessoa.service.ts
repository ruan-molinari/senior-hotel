import { Injectable } from '@angular/core';
import { Observable, Subject, concatAll, debounceTime, map, tap } from 'rxjs';
import { Pessoa } from '../../shared/models/pessoa';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../../shared/global-constants';

const API_URL = GlobalConstants.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private httpClient: HttpClient) {  }

  getAll(): Observable<Pessoa[]> {
    return this.httpClient.get<Pessoa[]>(`${API_URL}/pessoa`)
  }

  save(pessoa: Pessoa): Observable<Pessoa> {
    return this.httpClient.post<Pessoa>(`${API_URL}/pessoa`, pessoa);
  }
}

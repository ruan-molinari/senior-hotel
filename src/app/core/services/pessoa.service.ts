import { Injectable } from '@angular/core';
import { Observable, Subject, concatAll, debounceTime, map, tap } from 'rxjs';
import { Pessoa } from '../../shared/models/pessoa';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Pessoa[]> {
    return this.httpClient.get<Pessoa[]>(`${API_URL}/pessoa`)
  }

  get(filtro: String): Observable<Pessoa[]> {
    return this.httpClient.get<Pessoa[]>(`${API_URL}/pessoa`)
      .pipe(tap(pessoas => pessoas.filter(
        (pessoa: Pessoa) =>
           pessoa.nome == filtro
        || pessoa.CPF == filtro
        || pessoa.telefone == filtro
      )))
  }

  save(pessoa: Pessoa): Observable<any> {
    return this.httpClient.post(`${API_URL}/pessoa`, pessoa);
  }
}

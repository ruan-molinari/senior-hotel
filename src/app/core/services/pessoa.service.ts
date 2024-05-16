import { Injectable } from '@angular/core';
import { Observable, find } from 'rxjs';
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

  get(filtro: String): Observable<Pessoa | undefined> {
    return this.httpClient.get<Pessoa>(`${API_URL}/pessoa`)
      .pipe(find(
        (pessoa: Pessoa) =>
           pessoa.nome == filtro
        || pessoa.CPF == filtro
        || pessoa.telefone == filtro
      ))
  }

  save(pessoa: Pessoa): Observable<any> {
    return this.httpClient.put(`${API_URL}/pessoa`, pessoa);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry } from 'rxjs';

import { environment } from '../../environments/environment';
import { Consulta } from '../pages/consultas/model/consulta';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService extends BaseService {
  baseUrl = `${environment.baseUrl}consulta`;

  constructor(override httpClient: HttpClient) {
    super(httpClient);
  }

  get(): Observable<Consulta[]> {
    return this.httpClient
      .get<Consulta[]>(this.baseUrl, this.obterHeaderJson())
      .pipe(map(this.extractData), retry(2), catchError(this.serviceError));
  }

  getById(id: number) {
    return this.httpClient
      .get<Consulta>(this.baseUrl + '/' + id, this.obterHeaderJson())
      .pipe(map(this.extractData), retry(2), catchError(this.serviceError));
  }

  save(consulta: Partial<Consulta>) {
    if (consulta.id) {
      return this.put(consulta);
    }
    return this.post(consulta);
  }

  post(consulta: Partial<Consulta>) {
    return this.httpClient
      .post<Consulta>(this.baseUrl, consulta, this.obterHeaderJson())
      .pipe(retry(2), catchError(this.serviceError));
  }

  put(consulta: Partial<Consulta>) {
    return this.httpClient
      .put<Consulta>(
        this.baseUrl + '/' + consulta.id,
        JSON.stringify(consulta),
        this.obterHeaderJson()
      )
      .pipe(retry(1), catchError(this.serviceError));
  }

  putSintoma(consulta: Partial<Consulta>) {
    return this.httpClient
      .put<Consulta>(
        this.baseUrl + '/' + consulta.id + '/sintomas',
        JSON.stringify(consulta),
        this.obterHeaderJson()
      )
      .pipe(retry(1), catchError(this.serviceError));
  }

  delete(id: number) {
    return this.httpClient
      .delete<Consulta>(this.baseUrl + '/' + id, this.obterHeaderJson())
      .pipe(retry(1), catchError(this.serviceError));
  }
}

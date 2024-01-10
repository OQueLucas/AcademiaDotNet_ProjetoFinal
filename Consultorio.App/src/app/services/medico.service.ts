import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry } from 'rxjs';

import { environment } from '../../environments/environment';
import { Medico } from '../pages/medicos/model/medico';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class MedicoService extends BaseService {
  baseUrl = `${environment.baseUrl}medico`;

  constructor(override httpClient: HttpClient) {
    super(httpClient);
  }

  get(): Observable<Medico[]> {
    return this.httpClient
      .get<Medico[]>(this.baseUrl, this.obterHeaderJson())
      .pipe(map(this.extractData), retry(2), catchError(this.serviceError));
  }

  getById(id: number) {
    return this.httpClient
      .get<Medico>(this.baseUrl + '/' + id, this.obterHeaderJson())
      .pipe(map(this.extractData), retry(2), catchError(this.serviceError));
  }

  save(medico: Partial<Medico>) {
    if (medico.id) {
      return this.put(medico);
    }
    return this.post(medico);
  }

  post(medico: Partial<Medico>) {
    return this.httpClient
      .post<Medico>(this.baseUrl, medico, this.obterHeaderJson())
      .pipe(retry(2), catchError(this.serviceError));
  }

  put(medico: Partial<Medico>) {
    return this.httpClient
      .put<Medico>(
        this.baseUrl + '/' + medico.id,
        JSON.stringify(medico),
        this.obterHeaderJson()
      )
      .pipe(retry(1), catchError(this.serviceError));
  }

  delete(id: number) {
    return this.httpClient
      .delete<Medico>(this.baseUrl + '/' + id, this.obterHeaderJson())
      .pipe(retry(1), catchError(this.serviceError));
  }
}

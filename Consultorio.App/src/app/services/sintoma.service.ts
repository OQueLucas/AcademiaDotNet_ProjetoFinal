import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, Observable, retry } from 'rxjs';

import { environment } from '../../environments/environment';
import { Sintoma } from '../pages/sintomas/model/sintoma';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class SintomaService extends BaseService {
  baseUrl = `${environment.baseUrl}sintomas`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get(): Observable<Sintoma[]> {
    return this.httpClient
      .get<Sintoma[]>(this.baseUrl, this.obterHeaderJson())
      .pipe(first(), retry(2), catchError(this.serviceError));
  }

  getById(id: number): Observable<Sintoma> {
    return this.httpClient
      .get<Sintoma>(this.baseUrl + '/' + id, this.obterHeaderJson())
      .pipe(first(), retry(2), catchError(this.serviceError));
  }

  save(sintoma: Partial<Sintoma>) {
    if (sintoma.id) {
      return this.put(sintoma);
    }
    return this.post(sintoma);
  }

  private post(sintoma: Partial<Sintoma>): Observable<Sintoma> {
    return this.httpClient
      .post<Sintoma>(
        this.baseUrl,
        JSON.stringify(sintoma),
        this.obterHeaderJson()
      )
      .pipe(first(), retry(2), catchError(this.serviceError));
  }

  private put(sintoma: Partial<Sintoma>): Observable<Sintoma> {
    return this.httpClient
      .put<Sintoma>(
        this.baseUrl + '/' + sintoma.id,
        JSON.stringify(sintoma),
        this.obterHeaderJson()
      )
      .pipe(first(), retry(1), catchError(this.serviceError));
  }

  delete(id: number) {
    return this.httpClient
      .delete(this.baseUrl + '/' + id, this.obterHeaderJson())
      .pipe(first(), retry(1), catchError(this.serviceError));
  }
}

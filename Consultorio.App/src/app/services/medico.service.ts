import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, retry, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Medico } from '../medicos/model/medico';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  baseUrl = `${environment.baseUrl}api/medico`;

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' }),
  };

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage =
        `Código de erro: ${error.status}, ` + `mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => errorMessage);
  }

  get(): Observable<Medico[]> {
    return this.httpClient
      .get<Medico[]>(this.baseUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  getById(id: number) {
    return this.httpClient
      .get<Medico>(this.baseUrl + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  save(medico: Partial<Medico>) {
    if (medico.id) {
      return this.put(medico);
    }
    return this.post(medico);
  }

  post(medico: Partial<Medico>) {
    return this.httpClient
      .post<Medico>(this.baseUrl, medico)
      .pipe(retry(2), catchError(this.handleError));
  }

  put(medico: Partial<Medico>) {
    return this.httpClient
      .put<Medico>(
        this.baseUrl + '/' + medico.id,
        JSON.stringify(medico),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  delete(id: number) {
    return this.httpClient
      .delete<Medico>(this.baseUrl + '/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }
}

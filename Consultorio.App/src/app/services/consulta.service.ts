import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Consulta } from '../pages/consultas/model/consulta';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  baseUrl = `${environment.baseUrl}api/consulta`;

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

  get(): Observable<Consulta[]> {
    return this.httpClient
      .get<Consulta[]>(this.baseUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  getById(id: number) {
    return this.httpClient
      .get<Consulta>(this.baseUrl + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  save(consulta: Partial<Consulta>) {
    if (consulta.id) {
      return this.put(consulta);
    }
    return this.post(consulta);
  }

  post(consulta: Partial<Consulta>) {
    return this.httpClient
      .post<Consulta>(this.baseUrl, consulta)
      .pipe(retry(2), catchError(this.handleError));
  }

  put(consulta: Partial<Consulta>) {
    return this.httpClient
      .put<Consulta>(
        this.baseUrl + '/' + consulta.id,
        JSON.stringify(consulta),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  delete(id: number) {
    return this.httpClient
      .delete<Consulta>(this.baseUrl + '/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }
}

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, first, Observable, retry, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Sintoma } from '../pages/sintomas/model/sintoma';

@Injectable({
  providedIn: 'root',
})
export class SintomaService {
  baseUrl = `${environment.baseUrl}api/sintomas`;

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

  get(): Observable<Sintoma[]> {
    return this.httpClient.get<Sintoma[]>(this.baseUrl).pipe(
      first(),
      //delay(5000),
      retry(2),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<Sintoma> {
    return this.httpClient
      .get<Sintoma>(this.baseUrl + '/' + id)
      .pipe(first(), retry(2), catchError(this.handleError));
  }

  save(sintoma: Partial<Sintoma>) {
    if (sintoma.id) {
      return this.put(sintoma);
    }
    return this.post(sintoma);
  }

  private post(sintoma: Partial<Sintoma>): Observable<Sintoma> {
    return this.httpClient
      .post<Sintoma>(this.baseUrl, JSON.stringify(sintoma), this.httpOptions)
      .pipe(first(), retry(2), catchError(this.handleError));
  }

  private put(sintoma: Partial<Sintoma>): Observable<Sintoma> {
    return this.httpClient
      .put<Sintoma>(
        this.baseUrl + '/' + sintoma.id,
        JSON.stringify(sintoma),
        this.httpOptions
      )
      .pipe(first(), retry(1), catchError(this.handleError));
  }

  delete(id: number) {
    return this.httpClient
      .delete(this.baseUrl + '/' + id)
      .pipe(first(), retry(1), catchError(this.handleError));
  }
}

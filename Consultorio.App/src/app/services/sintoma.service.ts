import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Sintoma } from '../models/sintoma';

@Injectable({
  providedIn: 'root'
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

  getSintoma(): Observable<Sintoma[]> {
    return this.httpClient
      .get<Sintoma[]>(this.baseUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  getSintomaById(id: number): Observable<Sintoma> {
    return this.httpClient
      .get<Sintoma>(this.baseUrl + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  saveSintoma(sintoma: Sintoma): Observable<Sintoma> {
    return this.httpClient
      .post<Sintoma>(this.baseUrl, JSON.stringify(sintoma), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateSintoma(sintoma: Sintoma): Observable<Sintoma> {
    return this.httpClient
      .put<Sintoma>(
        this.baseUrl + '/' + sintoma.id,
        JSON.stringify(sintoma),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteSintoma(sintoma: Sintoma) {
    return this.httpClient
      .delete<Sintoma>(this.baseUrl + '/' + sintoma.id)
      .pipe(retry(1), catchError(this.handleError));
  }

  addSintoma(sintoma: Sintoma) {
    return this.httpClient
      .post<Sintoma>(this.baseUrl, JSON.stringify(sintoma))
      .pipe(retry(2), catchError(this.handleError));
  }
}

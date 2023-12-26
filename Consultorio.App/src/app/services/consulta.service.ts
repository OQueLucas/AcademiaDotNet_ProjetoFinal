import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Consulta } from '../models/Consulta';

@Injectable({
  providedIn: 'root'
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

  getConsulta(): Observable<Consulta[]> {
    return this.httpClient
      .get<Consulta[]>(this.baseUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  getConsultaById(id: number): Observable<Consulta> {
    return this.httpClient
      .get<Consulta>(this.baseUrl + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  post(consulta: Consulta): Observable<Consulta> {
    return this.httpClient
      .post<Consulta>(this.baseUrl, JSON.stringify(consulta), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  put(consulta: Consulta): Observable<Consulta> {
    return this.httpClient
      .put<Consulta>(
        this.baseUrl + '/' + consulta.id,
        JSON.stringify(consulta),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // deleteConsulta(consulta: Consulta) {
  //   return this.httpClient
  //     .delete<Consulta>(this.baseUrl + '/' + consulta.id)
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  addConsulta(consulta: Consulta) {
    return this.httpClient
      .post<Consulta>(this.baseUrl, JSON.stringify(consulta))
      .pipe(retry(2), catchError(this.handleError));
  }
}

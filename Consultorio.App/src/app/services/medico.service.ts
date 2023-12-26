import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Medico } from '../models/Medico';

@Injectable({
  providedIn: 'root'
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

  getMedico(): Observable<Medico[]> {
    return this.httpClient
      .get<Medico[]>(this.baseUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  getMedicoById(id: number): Observable<Medico> {
    return this.httpClient
      .get<Medico>(this.baseUrl + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  saveMedico(medico: Medico): Observable<Medico> {
    return this.httpClient
      .post<Medico>(this.baseUrl, JSON.stringify(medico), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateMedico(medico: Medico): Observable<Medico> {
    return this.httpClient
      .put<Medico>(
        this.baseUrl + '/' + medico.id,
        JSON.stringify(medico),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // deleteMedico(medico: Medico) {
  //   return this.httpClient
  //     .delete<Medico>(this.baseUrl + '/' + medico.id)
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  addMedico(medico: Medico) {
    return this.httpClient
      .post<Medico>(this.baseUrl, JSON.stringify(medico))
      .pipe(retry(2), catchError(this.handleError));
  }
}

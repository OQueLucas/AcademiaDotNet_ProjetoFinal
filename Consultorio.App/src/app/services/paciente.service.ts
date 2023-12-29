import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, retry, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Paciente } from '../pacientes/models/Paciente';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  baseUrl = `${environment.baseUrl}api/paciente`;

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

  get(): Observable<Paciente[]> {
    return this.httpClient
      .get<Paciente[]>(this.baseUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  getById(id: number): Observable<Paciente> {
    return this.httpClient
      .get<Paciente>(this.baseUrl + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  save(paciente: Partial<Paciente>) {
    if (paciente.id) {
      return this.put(paciente);
    }
    return this.post(paciente);
  }

  post(paciente: Partial<Paciente>) {
    return this.httpClient
      .post(`${this.baseUrl}`, paciente)
      .pipe(retry(2), catchError(this.handleError));
  }

  put(paciente: Partial<Paciente>): Observable<Paciente> {
    return this.httpClient
      .put<Paciente>(
        this.baseUrl + '/' + paciente.id,
        JSON.stringify(paciente),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  delete(id: number) {
    return this.httpClient
      .delete<Paciente>(this.baseUrl + '/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  addPaciente(paciente: Paciente) {
    return this.httpClient
      .post<Paciente>(this.baseUrl, JSON.stringify(paciente))
      .pipe(retry(2), catchError(this.handleError));
  }
}

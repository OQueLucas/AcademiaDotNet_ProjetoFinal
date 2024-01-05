import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, retry, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Paciente } from '../pages/pacientes/models/Paciente';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class PacienteService extends BaseService {
  baseUrl = `${environment.baseUrl}paciente`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get(): Observable<Paciente[]> {
    return this.httpClient
      .get<Paciente[]>(this.baseUrl)
      .pipe(map(this.extractData), retry(2), catchError(this.serviceError));
  }

  getById(id: number) {
    return this.httpClient
      .get<Paciente>(this.baseUrl + '/' + id)
      .pipe(map(this.extractData), retry(2), catchError(this.serviceError));
  }

  save(paciente: Partial<Paciente>) {
    if (paciente.id) {
      return this.put(paciente);
    }
    return this.post(paciente);
  }

  post(paciente: Partial<Paciente>) {
    let response = this.httpClient
      .post(`${this.baseUrl}`, paciente)
      .pipe(retry(2), catchError(this.serviceError));
    return response;
  }

  put(paciente: Partial<Paciente>) {
    return this.httpClient
      .put<Paciente>(
        this.baseUrl + '/' + paciente.id,
        JSON.stringify(paciente),
        this.obterHeaderJson()
      )
      .pipe(retry(1), catchError(this.serviceError));
  }

  delete(id: number) {
    return this.httpClient
      .delete<Paciente>(this.baseUrl + '/' + id)
      .pipe(retry(1), catchError(this.serviceError));
  }

  addPaciente(paciente: Paciente) {
    return this.httpClient
      .post<Paciente>(this.baseUrl, JSON.stringify(paciente))
      .pipe(retry(2), catchError(this.serviceError));
  }
}

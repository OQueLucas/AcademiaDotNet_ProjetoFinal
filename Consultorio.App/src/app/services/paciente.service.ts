import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry } from 'rxjs';

import { environment } from '../../environments/environment';
import { Paciente } from '../pages/pacientes/models/Paciente';
import { BaseService } from './base.service';
import { CepConsulta } from '../pages/pacientes/models/CepConsulta';

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
      .get<Paciente[]>(this.baseUrl, this.obterHeaderJson())
      .pipe(map(this.extractData), retry(2), catchError(super.serviceError));
  }

  getById(id: number) {
    return this.httpClient
      .get<Paciente>(this.baseUrl + '/' + id, this.obterHeaderJson())
      .pipe(map(this.extractData), retry(2), catchError(super.serviceError));
  }

  save(paciente: Paciente) {
    if (paciente.id) {
      return this.put(paciente);
    }
    return this.post(paciente);
  }

  post(paciente: Paciente) {
    let response = this.httpClient
      .post(`${this.baseUrl}`, paciente, this.obterHeaderJson())
      .pipe(retry(2), catchError(super.serviceError));
    return response;
  }

  put(paciente: Paciente) {
    return this.httpClient
      .put<Paciente>(
        this.baseUrl + '/' + paciente.id,
        JSON.stringify(paciente),
        this.obterHeaderJson()
      )
      .pipe(retry(1), catchError(super.serviceError));
  }

  delete(id: number) {
    return this.httpClient
      .delete<Paciente>(this.baseUrl + '/' + id, this.obterHeaderJson())
      .pipe(retry(1), catchError(super.serviceError));
  }

  addPaciente(paciente: Paciente) {
    return this.httpClient
      .post<Paciente>(
        this.baseUrl,
        JSON.stringify(paciente),
        this.obterHeaderJson()
      )
      .pipe(retry(2), catchError(super.serviceError));
  }

  consultarCep(cep: string): Observable<CepConsulta> {
    return this.httpClient
      .get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json`)
      .pipe(catchError(super.serviceError));
  }
}

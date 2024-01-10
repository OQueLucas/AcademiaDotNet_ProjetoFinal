import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LocalStorageUtils } from '../utils/localstorage';
import { CepConsulta } from '../pages/pacientes/models/CepConsulta';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public LocalStorage = new LocalStorageUtils();

  constructor(protected httpClient: HttpClient) {}

  protected obterHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.LocalStorage.obterTokenUsuario()}`,
      }),
    };
  }

  protected extractData(response: any) {
    return response.data || {};
  }

  protected serviceError(response: Response | any) {
    let customError: string[] = [];

    if (response instanceof HttpErrorResponse) {
      if (response.statusText === 'Unknown Error') {
        customError.push('Ocorreu um erro desconhecido');
        response.error.errors = customError;
      }
    }
    console.error(response);
    return throwError(() => response);
  }

  public consultarCep(cep: string): Observable<CepConsulta> {
    return this.httpClient
      .get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json`)
      .pipe(catchError(this.serviceError));
  }
}

import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { LocalStorageUtils } from '../utils/localstorage';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public LocalStorage = new LocalStorageUtils();

  constructor() {}

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
}

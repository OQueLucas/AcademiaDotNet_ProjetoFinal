import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioLogin } from '../models/UsuarioLogin';
import { Observable, catchError, map, retry } from 'rxjs';
import { BaseService } from '../../services/base.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContaService extends BaseService {
  baseUrl = `${environment.baseUrl}`;
  constructor(private http: HttpClient) {
    super();
  }

  registrarUsuario(usuario: UsuarioLogin): Observable<UsuarioLogin> {
    let response = this.http
      .post(this.baseUrl + 'nova-conta', usuario)
      .pipe(map(this.extractData), retry(2), catchError(this.serviceError));
    return response;
  }

  login(usuario: UsuarioLogin): Observable<UsuarioLogin> {
    let response = this.http
      .post(this.baseUrl + 'entrar', usuario)
      .pipe(map(this.extractData), retry(2), catchError(this.serviceError));
    return response;
  }
}

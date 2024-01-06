import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable, catchError, map } from 'rxjs';
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

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    let response = this.http
      .post(this.baseUrl + 'nova-conta', usuario)
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  login(usuario: Usuario): Observable<Usuario> {
    let response = this.http
      .post(this.baseUrl + 'entrar', usuario)
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }
}

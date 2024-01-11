import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry } from 'rxjs';
import { BaseService } from '../../services/base.service';
import { environment } from '../../../environments/environment';
import { Role } from '../models/Role';
import { UserRole } from '../models/UserRole';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends BaseService {
  baseUrl = `${environment.baseUrl}admin/`;
  constructor(override httpClient: HttpClient) {
    super(httpClient);
  }

  getRoles() {
    return this.httpClient
      .get<Role[]>(this.baseUrl + 'role', this.obterHeaderJson())
      .pipe(map(this.extractData), retry(2), catchError(super.serviceError));
  }

  obterRolesUsuario(id: string): Observable<UserRole[]> {
    return this.httpClient
      .get<UserRole>(this.baseUrl + 'role/' + id, this.obterHeaderJson())
      .pipe(map(this.extractData), retry(2), catchError(super.serviceError));
  }

  adicionarRolesUsuario(id: string, roles: UserRole[]): Observable<UserRole[]> {
    return this.httpClient
      .post<UserRole>(
        this.baseUrl + 'role/' + id,
        JSON.stringify(roles),
        this.obterHeaderJson()
      )
      .pipe(map(this.extractData), retry(2), catchError(super.serviceError));
  }

  put(usuario: Usuario) {
    return this.httpClient
      .put<Usuario>(
        this.baseUrl + 'usuario/' + usuario.id,
        JSON.stringify(usuario),
        this.obterHeaderJson()
      )
      .pipe(retry(1), catchError(super.serviceError));
  }

  removerRole(id: string) {
    return this.httpClient
      .delete(this.baseUrl + 'usuario/' + id, this.obterHeaderJson())
      .pipe(map(this.extractData), retry(1), catchError(super.serviceError));
  }

  obterUsuario(id: string) {
    return this.httpClient
      .get<Usuario>(this.baseUrl + 'usuario/' + id, this.obterHeaderJson())
      .pipe(map(this.extractData), retry(2), catchError(super.serviceError));
  }

  listarUsuarios() {
    return this.httpClient
      .get<Usuario[]>(this.baseUrl + 'usuario', this.obterHeaderJson())
      .pipe(map(this.extractData), retry(2), catchError(super.serviceError));
  }

  removerUsuario(id: string) {
    return this.httpClient
      .delete(this.baseUrl + 'usuario/' + id, this.obterHeaderJson())
      .pipe(map(this.extractData), retry(1), catchError(super.serviceError));
  }
}

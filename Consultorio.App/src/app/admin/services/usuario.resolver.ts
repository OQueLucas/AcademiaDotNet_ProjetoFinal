import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, asyncScheduler, of, scheduled } from 'rxjs';
import { AdminService } from './admin.service';
import { Usuario } from '../models/Usuario';

export const usuarioResolver: ResolveFn<Observable<Usuario>> = (
  route,
  state
) => {
  if (route.params && route.params['id']) {
    return inject(AdminService).obterUsuario(route.params['id']);
  }
  return scheduled(
    of({
      id: '',
      userName: '',
      email: '',
      emailConfirmed: null,
      phoneNumber: null,
      phoneNumberConfirmed: null,
      roles: [],
    }),
    asyncScheduler
  );
};

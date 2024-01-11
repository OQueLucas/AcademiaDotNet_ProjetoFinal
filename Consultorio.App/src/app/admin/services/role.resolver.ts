import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, asyncScheduler, of, scheduled } from 'rxjs';
import { AdminService } from './admin.service';
import { Role } from '../models/Role';

export const roleResolver: ResolveFn<Observable<Role>> = (route, state) => {
  if (route.params && route.params['id']) {
    return inject(AdminService).obterRole(route.params['id']);
  }
  return scheduled(
    of({
      id: '',
      name: '',
      normalizedName: '',
      concurrencyStamp: 0,
    }),
    asyncScheduler
  );
};

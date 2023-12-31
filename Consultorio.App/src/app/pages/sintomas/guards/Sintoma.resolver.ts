import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { asyncScheduler, Observable, of, scheduled } from 'rxjs';

import { Sintoma } from './../model/sintoma';
import { SintomaService } from '../../../services/sintoma.service';

export const SintomaResolver: ResolveFn<Observable<Sintoma>> = (
  route,
  state
) => {
  if (route.params && route.params['id']) {
    return inject(SintomaService).getById(route.params['id']);
  }
  return scheduled(of({ id: 0, nome: '' }), asyncScheduler);
};

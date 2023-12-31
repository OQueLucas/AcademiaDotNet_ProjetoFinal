import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, asyncScheduler, of, scheduled } from 'rxjs';

import { ConsultaService } from '../../../services/consulta.service';
import { Consulta } from '../model/consulta';

export const consultaResolver: ResolveFn<Observable<Consulta>> = (
  route,
  state
) => {
  if (route.params && route.params['id']) {
    return inject(ConsultaService).getById(route.params['id']);
  }
  return scheduled(
    of({
      id: 0,
      tipoConsulta: null,
      descricao: '',
      data: null,
      medicoId: null,
      medicoCRM: '',
      especializacao: '',
      medicoNome: '',
      medicoNomeSocial: '',
      pacienteId: null,
      nome: '',
      nomeSocial: '',
      cpf: '',
      dataNascimento: null,
      email: '',
      telefone: '',
      tipoSanguineo: null,
      genero: null,
      Sintoma: [],
    }),
    asyncScheduler
  );
};

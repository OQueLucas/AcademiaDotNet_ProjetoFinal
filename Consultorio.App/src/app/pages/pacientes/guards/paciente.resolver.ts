import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { asyncScheduler, Observable, of, scheduled } from 'rxjs';

import { Paciente } from './../models/Paciente';
import { PacienteService } from '../../../services/paciente.service';

export const pacienteResolver: ResolveFn<Observable<Paciente>> = (
  route,
  state
) => {
  if (route.params && route.params['id']) {
    return inject(PacienteService).getById(route.params['id']);
  }
  return scheduled(
    of({
      id: 0,
      nome: '',
      pessoaId: 0,
      nomeSocial: '',
      cpf: '',
      dataNascimento: null,
      email: '',
      tipoSanguineo: null,
      genero: null,
      cep: '',
      bairro: '',
      endereco: '',
      telefone: '',
      observacao: '',
      consultas: [],
    }),
    asyncScheduler
  );
};

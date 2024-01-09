import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { pacienteResolver } from './guards/paciente.resolver';
import { PacienteGuard } from './guards/paciente.guard';
import { PacienteDetalhesComponent } from './paciente-detalhes/paciente-detalhes.component';

const routes: Routes = [
  {
    path: '',
    component: PacientesComponent,
    canActivate: [PacienteGuard],
    data: [{ claim: { nome: 'role', valor: 'Medico' } }],
  },
  {
    path: 'novo',
    component: PacienteFormComponent,
    resolve: { paciente: pacienteResolver },
    canDeactivate: [PacienteGuard],
    canActivate: [PacienteGuard],
    data: [{ claim: { nome: 'role', valor: 'Medico' } }],
  },
  {
    path: 'detalhes/:id',
    component: PacienteDetalhesComponent,
    resolve: { paciente: pacienteResolver },
    canActivate: [PacienteGuard],
    data: [{ claim: { nome: 'role', valor: 'Medico' } }],
  },
  {
    path: 'editar/:id',
    component: PacienteFormComponent,
    resolve: { paciente: pacienteResolver },
    canActivate: [PacienteGuard],
    data: [{ claim: { nome: 'role', valor: 'Medico' } }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientesRoutingModule {}

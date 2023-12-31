import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { pacienteResolver } from './guards/paciente.resolver';

const routes: Routes = [
  { path: '', component: PacientesComponent },
  {
    path: 'novo',
    component: PacienteFormComponent,
    resolve: { paciente: pacienteResolver },
  },
  {
    path: 'editar/:id',
    component: PacienteFormComponent,
    resolve: { paciente: pacienteResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientesRoutingModule {}

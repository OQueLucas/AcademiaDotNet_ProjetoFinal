import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoFormComponent } from './medico-form/medico-form.component';
import { medicoResolver } from './guards/medico.resolver';

const routes: Routes = [
  { path: '', component: MedicosComponent },
  {
    path: 'novo',
    component: MedicoFormComponent,
    resolve: { medico: medicoResolver },
  },
  {
    path: 'editar/:id',
    component: MedicoFormComponent,
    resolve: { medico: medicoResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicosRoutingModule {}

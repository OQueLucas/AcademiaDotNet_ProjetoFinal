import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsultaComponent } from './consulta/consulta.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'pacientes',
    loadChildren: () =>
      import('./pacientes/pacientes.module').then((m) => m.PacientesModule),
  },
  {
    path: 'medicos',
    loadChildren: () =>
      import('./medicos/medicos.module').then((m) => m.MedicosModule),
  },
  {
    path: 'sintomas',
    loadChildren: () =>
      import('./sintomas/sintomas.module').then((m) => m.SintomasModule),
  },
  { path: 'consultas', component: ConsultaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

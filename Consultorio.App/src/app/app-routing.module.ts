import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'pacientes',
    loadChildren: () =>
      import('./pages/pacientes/pacientes.module').then(
        (m) => m.PacientesModule
      ),
  },
  {
    path: 'medicos',
    loadChildren: () =>
      import('./pages/medicos/medicos.module').then((m) => m.MedicosModule),
  },
  {
    path: 'sintomas',
    loadChildren: () =>
      import('./pages/sintomas/sintomas.module').then((m) => m.SintomasModule),
  },
  {
    path: 'consultas',
    loadChildren: () =>
      import('./pages/consultas/consultas.module').then(
        (m) => m.ConsultasModule
      ),
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
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
  {
    path: 'conta',
    loadChildren: () =>
      import('./conta/conta.module').then((m) => m.ContaModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },

  { path: 'acesso-negado', component: AcessoNegadoComponent },
  { path: 'nao-encontrado', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ContaAppComponent } from './conta.app.component';
import { LoginComponent } from './login/login.component';
import { CanDeactivate, canActivate } from './services/conta.guard';

const routes: Routes = [
  {
    path: '',
    component: ContaAppComponent,
    children: [
      {
        path: 'cadastro',
        component: CadastroComponent,
        canDeactivate: [CanDeactivate],
        canActivate: [canActivate],
      },
      {
        path: 'login',
        component: LoginComponent,
        canDeactivate: [CanDeactivate],
        canActivate: [canActivate],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContaRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ContaAppComponent } from './conta.app.component';
import { LoginComponent } from './login/login.component';
import { CanDeactivate, canActivate } from './services/conta.guard';
import { RoleComponent } from './role/role.component';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';
import { DetalhesComponent } from './usuarios/detalhes/detalhes.component';
import { usuarioResolver } from './services/usuario.resolver';

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
      {
        path: 'admin/role',
        component: RoleComponent,
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
      },
      {
        path: 'usuarios/detalhes/:id',
        component: DetalhesComponent,
        resolve: { usuario: usuarioResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContaRoutingModule {}

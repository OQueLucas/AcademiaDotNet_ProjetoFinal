import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAppComponent } from './admin.app.component';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';
import { DetalhesComponent } from './usuarios/detalhes/detalhes.component';
import { usuarioResolver } from './services/usuario.resolver';
import { RoleComponent } from './role/role.component';
import { AdminGuard } from './services/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminAppComponent,
    canActivate: [AdminGuard],
    data: [{ claim: { nome: 'role', valor: 'Admin' } }],
    children: [
      {
        path: 'role',
        component: RoleComponent,
        canActivate: [AdminGuard],
        data: [{ claim: { nome: 'role', valor: 'Admin' } }],
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AdminGuard],
        data: [{ claim: { nome: 'role', valor: 'Admin' } }],
      },
      {
        path: 'usuarios/detalhes/:id',
        component: DetalhesComponent,
        resolve: { usuario: usuarioResolver },
        canActivate: [AdminGuard],
        data: [{ claim: { nome: 'role', valor: 'Admin' } }],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAppComponent } from './admin.app.component';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';
import { DetalhesComponent } from './usuarios/detalhes/detalhes.component';
import { usuarioResolver } from './services/usuario.resolver';
import { RoleComponent } from './role/role.component';
import { AdminGuard } from './services/admin.guard';
import { UsuarioEditarComponent } from './usuarios/editar/usuario-editar.component';
import { roleResolver } from './services/role.resolver';
import { RoleEditarComponent } from './Roles/editar/role-editar.component';
import { RoleNovoComponent } from './Roles/novo/role-novo.component';

const routes: Routes = [
  {
    path: '',
    component: AdminAppComponent,
    canActivate: [AdminGuard],
    data: [{ claim: { nome: 'role', valor: 'Admin' } }],
    children: [
      {
        path: 'roles',
        component: RoleComponent,
        canActivate: [AdminGuard],
        data: [{ claim: { nome: 'role', valor: 'Admin' } }],
      },
      {
        path: 'roles/editar/:id',
        component: RoleEditarComponent,
        resolve: { role: roleResolver },
        canActivate: [AdminGuard],
        data: [{ claim: { nome: 'role', valor: 'Admin' } }],
      },
      {
        path: 'roles/novo',
        component: RoleNovoComponent,
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
      {
        path: 'usuarios/editar/:id',
        component: UsuarioEditarComponent,
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

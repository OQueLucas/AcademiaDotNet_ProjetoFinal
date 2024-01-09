import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAppComponent } from './admin.app.component';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';
import { DetalhesComponent } from './usuarios/detalhes/detalhes.component';
import { usuarioResolver } from './services/usuario.resolver';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
  {
    path: '',
    component: AdminAppComponent,
    children: [
      {
        path: 'role',
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
export class AdminRoutingModule {}

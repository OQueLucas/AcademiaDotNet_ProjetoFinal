import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminAppComponent } from './admin.app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DetalhesComponent } from './usuarios/detalhes/detalhes.component';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';
import { RoleComponent } from './role/role.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminGuard } from './services/admin.guard';
import { UsuarioEditarComponent } from './usuarios/editar/usuario-editar.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { RoleEditarComponent } from './Roles/editar/role-editar.component';

@NgModule({
  declarations: [
    AdminAppComponent,
    DetalhesComponent,
    UsuariosComponent,
    RoleComponent,
    UsuarioEditarComponent,
    RoleEditarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [AdminGuard],
})
export class AdminModule {}

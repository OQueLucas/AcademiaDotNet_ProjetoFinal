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
import { EditarComponent } from './usuarios/editar/editar.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@NgModule({
  declarations: [
    AdminAppComponent,
    DetalhesComponent,
    UsuariosComponent,
    RoleComponent,
    EditarComponent,
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

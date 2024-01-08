import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { ContaAppComponent } from './conta.app.component';

import { ContaRoutingModule } from './conta.route';
import { ContaService } from './services/conta.service';
// import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { RoleComponent } from './role/role.component';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';
import { DetalhesComponent } from './usuarios/detalhes/detalhes.component';

@NgModule({
  declarations: [
    ContaAppComponent,
    CadastroComponent,
    LoginComponent,
    RoleComponent,
    UsuariosComponent,
    DetalhesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ContaRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    // NarikCustomValidatorsModule,
  ],
  providers: [ContaService],
})
export class ContaModule {}

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

@NgModule({
  declarations: [ContaAppComponent, CadastroComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    ContaRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    // NarikCustomValidatorsModule,
  ],
  providers: [ContaService],
})
export class ContaModule {}

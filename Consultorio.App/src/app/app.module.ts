import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { MedicosComponent } from './medicos/medicos.component';
import { SintomaComponent } from './sintoma/sintoma.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { TituloComponent } from './titulo/titulo.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';

registerLocaleData(localePT, 'pt')

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PacientesComponent,
    HomeComponent,
    MedicosComponent,
    SintomaComponent,
    ConsultaComponent,
    TituloComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    provideClientHydration(),
    HttpClientModule,
    FormsModule,
    provideNgxMask(),
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

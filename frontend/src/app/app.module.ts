import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuscadorLayoutComponent } from './layouts/buscador-layout/buscador-layout.component';
import { ResultadoLayoutComponent } from './layouts/resultado-layout/resultado-layout.component';
import { BuscadorComponent } from './buscador/buscador/buscador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResultadoComponent } from './resultado/resultado/resultado.component';
import { IntroducirIdConsultaComponent } from './resultado/introducir-id-consulta/introducir-id-consulta.component';

@NgModule({
  declarations: [
    AppComponent,
    BuscadorLayoutComponent,
    ResultadoLayoutComponent,
    BuscadorComponent,
    ResultadoComponent,
    IntroducirIdConsultaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

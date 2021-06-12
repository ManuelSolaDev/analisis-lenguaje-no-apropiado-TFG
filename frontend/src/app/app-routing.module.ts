import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResultadoLayoutComponent } from './layouts/resultado-layout/resultado-layout.component';
import { ResultadoComponent } from './resultado/resultado/resultado.component';
import { IntroducirIdConsultaComponent } from './resultado/introducir-id-consulta/introducir-id-consulta.component';
import { BuscadorLayoutComponent } from './layouts/buscador-layout/buscador-layout.component';
import { BuscadorComponent } from './buscador/buscador/buscador.component';

const routes: Routes = [
  { path: 'resultado', component: ResultadoLayoutComponent,
    children: [
      {  path: '', component: IntroducirIdConsultaComponent },
      {  path: ':idConsulta', component: ResultadoComponent },
      {  path: '**', redirectTo: '' }
    ]
  }
  ,{ path: '', component: BuscadorLayoutComponent,
    children: [
      {  path: '', component: BuscadorComponent },
      {  path: '**', redirectTo: '' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorLayoutComponent } from './layouts/buscador-layout/buscador-layout.component';
import { BuscadorComponent } from './buscador/buscador/buscador.component';

const routes: Routes = [
  { path: '', component: BuscadorLayoutComponent,
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MunicipioListComponent } from './municipio-v6/municipio-list.component';
import { MunicipioV6Component } from './municipio-v6/municipio-v6.component';

const routes: Routes = [
  { path: 'municipios', component: MunicipioListComponent },
  { path: 'municipio/new', component: MunicipioV6Component }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MunicipioListComponent } from './municipio-v5/municipio-list.component';
import { MunicipioV5Component } from './municipio-v5/municipio-v5.component';

const routes: Routes = [
  { path: 'municipios', component: MunicipioListComponent },
  { path: 'municipio/new', component: MunicipioV5Component }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



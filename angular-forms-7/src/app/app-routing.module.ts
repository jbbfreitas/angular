import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {municipioRoute} from './municipio-v7/municipio-v7.route';

@NgModule({
  imports: [RouterModule.forRoot(municipioRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



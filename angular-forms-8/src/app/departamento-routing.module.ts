import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {departamentoRoute} from './departamento-v8/departamento-v8.route';

@NgModule({
  imports: [RouterModule.forRoot(departamentoRoute)],
  exports: [RouterModule]
})
export class DepartamentoRoutingModule { }



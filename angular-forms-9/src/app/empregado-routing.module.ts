import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {empregadoRoute} from './empregado-v9/empregado-v9.route';

@NgModule({
  imports: [RouterModule.forRoot(empregadoRoute)],
  exports: [RouterModule]
})
export class EmpregadoRoutingModule { }



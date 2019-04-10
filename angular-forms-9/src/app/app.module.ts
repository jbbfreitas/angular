import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MunicipioRoutingModule } from './municipio-routing.module';
import { MunicipioV7Component } from './municipio-v7/municipio-v7.component';
import { MunicipioListComponent } from './municipio-v7/municipio-list.component';
import { MunicipioV7Service } from './municipio-v7/municipio-v7.service';
import {municipioRoute} from './municipio-v7/municipio-v7.route';
import { DepartamentoRoutingModule } from './departamento-routing.module';
import { DepartamentoV8Component } from './departamento-v8/departamento-v8.component';
import { DepartamentoListComponent } from './departamento-v8/departamento-list.component';
import { DepartamentoV8Service } from './departamento-v8/departamento-v8.service';
import {departamentoRoute} from './departamento-v8/departamento-v8.route';
import { EmpregadoRoutingModule } from './empregado-routing.module';
import { EmpregadoV9Component } from './empregado-v9/empregado-v9.component';
import { EmpregadoListComponent } from './empregado-v9/empregado-list.component';
import { EmpregadoV9Service } from './empregado-v9/empregado-v9.service';
import {empregadoRoute} from './empregado-v9/empregado-v9.route';



const ENTITY_STATES = [...empregadoRoute, ...municipioRoute, ...departamentoRoute];
@NgModule({
  declarations: [
    AppComponent,
    MunicipioV7Component,
    MunicipioListComponent,
    DepartamentoV8Component,
    DepartamentoListComponent,
    EmpregadoV9Component,
    EmpregadoListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MunicipioRoutingModule,
    DepartamentoRoutingModule, EmpregadoRoutingModule, HttpClientModule,
    RouterModule.forChild(ENTITY_STATES)
  ],
  providers: [MunicipioV7Service, DepartamentoV8Service, EmpregadoV9Service],
  bootstrap: [AppComponent]
})
export class AppModule { }


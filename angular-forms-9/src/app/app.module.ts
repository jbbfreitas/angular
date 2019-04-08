import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MunicipioRoutingModule } from './municipio-routing.module';
import { DepartamentoRoutingModule } from './departamento-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MunicipioV7Component } from './municipio-v7/municipio-v7.component';
import { MunicipioListComponent } from './municipio-v7/municipio-list.component';
import { DepartamentoV8Component } from './departamento-v8/departamento-v8.component';
import { DepartamentoListComponent } from './departamento-v8/departamento-list.component';
import {HttpClientModule} from '@angular/common/http';
import { MunicipioV7Service } from './municipio-v7/municipio-v7.service';
import { DepartamentoV8Service } from './departamento-v8/departamento-v8.service';
import {municipioRoute} from './municipio-v7/municipio-v7.route';
import {departamentoRoute} from './departamento-v8/departamento-v8.route';
import { RouterModule } from '@angular/router';

const ENTITY_STATES = [...municipioRoute, ...departamentoRoute];
@NgModule({
  declarations: [
    AppComponent,
    MunicipioV7Component,
    MunicipioListComponent,
    DepartamentoV8Component,
    DepartamentoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MunicipioRoutingModule, DepartamentoRoutingModule, HttpClientModule,
    RouterModule.forChild(ENTITY_STATES)
  ],
  providers: [MunicipioV7Service, DepartamentoV8Service],
  bootstrap: [AppComponent]
})
export class AppModule { }


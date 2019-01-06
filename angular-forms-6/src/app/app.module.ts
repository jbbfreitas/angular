import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MunicipioV6Component } from './municipio-v6/municipio-v6.component';
import { MunicipioListComponent } from './municipio-v6/municipio-list.component';
import {HttpClientModule} from '@angular/common/http';
import { MunicipioV6Service } from './municipio-v6/municipio-v6.service';
import {municipioRoute} from './municipio-v6/municipio-v6.route';
import { RouterModule } from '@angular/router';

const ENTITY_STATES = [...municipioRoute];
@NgModule({
  declarations: [
    AppComponent,
     MunicipioV6Component,
    MunicipioListComponent

  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule,
    RouterModule.forChild(ENTITY_STATES)
  ],
  providers: [MunicipioV6Service],
  bootstrap: [AppComponent]
})
export class AppModule { }


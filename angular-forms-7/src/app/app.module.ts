import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MunicipioV7Component } from './municipio-v7/municipio-v7.component';
import { MunicipioListComponent } from './municipio-v7/municipio-list.component';
import {HttpClientModule} from '@angular/common/http';
import { MunicipioV7Service } from './municipio-v7/municipio-v7.service';
import {municipioRoute} from './municipio-v7/municipio-v7.route';
import { RouterModule } from '@angular/router';

const ENTITY_STATES = [...municipioRoute];
@NgModule({
  declarations: [
    AppComponent,
    MunicipioV7Component,
    MunicipioListComponent

  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule,
    RouterModule.forChild(ENTITY_STATES)
  ],
  providers: [MunicipioV7Service],
  bootstrap: [AppComponent]
})
export class AppModule { }


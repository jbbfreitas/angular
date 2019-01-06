import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MunicipioV5Component } from './municipio-v5/municipio-v5.component';
import { MunicipioListComponent } from './municipio-v5/municipio-list.component';
import {HttpClientModule} from '@angular/common/http';
import { MunicipioV5Service } from './municipio-v5/municipio-v5.service';
import {municipioRoute} from './municipio-v5/municipio-v5.route';
import { RouterModule } from '@angular/router';

const ENTITY_STATES = [...municipioRoute];
@NgModule({
  declarations: [
    AppComponent,
    MunicipioV5Component,
    MunicipioListComponent

  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule,
    RouterModule.forChild(ENTITY_STATES)
  ],
  providers: [MunicipioV5Service],
  bootstrap: [AppComponent]
})
export class AppModule { }


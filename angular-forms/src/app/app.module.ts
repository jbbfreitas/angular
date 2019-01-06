import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MunicipioV1Component } from './municipio-v1/municipio-v1.component';
import { MunicipioV2Component } from './municipio-v2/municipio-v2.component';
import { MunicipioV3Component } from './municipio-v3/municipio-v3.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MunicipioV4Component } from './municipio-v4/municipio-v4.component';
import { MunicipioV5Component } from './municipio-v5/municipio-v5.component';
import { MunicipioV6Component } from './municipio-v6/municipio-v6.component';
import { MunicipioV7Component } from './municipio-v7/municipio-v7.component';
import { MunicipioListComponent } from './municipio-v7/municipio-list.component';
import {HttpClientModule} from '@angular/common/http';
import { MunicipioV5Service } from './municipio-v5/municipio-v5.service';
import {municipioRoute} from './municipio-v5/municipio-v5.route';
import { RouterModule } from '@angular/router';

const ENTITY_STATES = [...municipioRoute];
@NgModule({
  declarations: [
    AppComponent,
    MunicipioV1Component,
    MunicipioV2Component,
    MunicipioV3Component,
    MunicipioV4Component,
    MunicipioV5Component,
    MunicipioV6Component,
    MunicipioV7Component,
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


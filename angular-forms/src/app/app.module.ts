import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MunicipioV1Component } from './municipio-v1/municipio-v1.component';
import { MunicipioV2Component } from './municipio-v2/municipio-v2.component';
import { MunicipioV3Component } from './municipio-v3/municipio-v3.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MunicipioV4Component } from './municipio-v4/municipio-v4.component';



@NgModule({
  declarations: [
    AppComponent,
    MunicipioV1Component,
    MunicipioV2Component,
    MunicipioV3Component,
    MunicipioV4Component
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

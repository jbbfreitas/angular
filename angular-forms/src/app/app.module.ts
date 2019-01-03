import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MunicipioV1Component } from './municipio-v1/municipio-v1.component';
import { MunicipioV2Component } from './municipio-v2/municipio-v2.component';



@NgModule({
  declarations: [
    AppComponent,
    MunicipioV1Component,
    MunicipioV2Component
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule, AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

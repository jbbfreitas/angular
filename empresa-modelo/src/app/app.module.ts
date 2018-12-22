import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DepartamentoComponent } from './departamento/departamento.component';
import { EmpregadoComponent } from './empregado/empregado.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartamentoComponent,
    EmpregadoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

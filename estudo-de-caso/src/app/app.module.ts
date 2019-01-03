import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MunicipioComponent } from './entities/municipio/municipio.component';
import { MunicipioUpdateComponent } from './entities/municipio/municipio-update.component';

@NgModule({
  declarations: [
    AppComponent,
    MunicipioComponent,
    MunicipioUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

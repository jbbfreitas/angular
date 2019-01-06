import { Component, OnInit } from '@angular/core';
import { IMunicipio, Municipio, Estado } from '../shared/model/municipio.model';

@Component({
  selector: 'app-municipio-v4',
  templateUrl: './municipio-v4.component.html',
  styleUrls: ['./municipio-v4.component.css']
})
export class MunicipioV4Component implements OnInit {
  municipio: IMunicipio = new Municipio();

   constructor() { }

  ngOnInit() {
  }

  save(): void {
    console.log ('O municipio é', this.municipio);

  }
}



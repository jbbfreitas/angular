import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-municipio-v3',
  templateUrl: './municipio-v3.component.html',
  styleUrls: ['./municipio-v3.component.css']
})
export class MunicipioV3Component implements OnInit {
  nomeMunicipio: string ;
  uf: string;
  constructor() { }

  ngOnInit() {
  }

  save(): void {
    console.log ('O nome do municipio é', this.nomeMunicipio);
    console.log ('O estado é', this.uf);

  }
}



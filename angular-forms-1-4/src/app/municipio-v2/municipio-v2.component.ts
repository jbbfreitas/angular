import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-municipio-v2',
  templateUrl: './municipio-v2.component.html',
  styleUrls: ['./municipio-v2.component.css']
})
export class MunicipioV2Component implements OnInit {
  nomeMunicipio: string ;
  uf: string;
  constructor() {
    this.nomeMunicipio = 'Corumbá';
  }

  ngOnInit() {
  }
  save(): void {
    console.log ('O nome do municipio é', this.nomeMunicipio);
    console.log ('O estado é', this.uf);

  }
}

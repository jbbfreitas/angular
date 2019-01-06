import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMunicipio, Municipio } from '../shared/model/municipio.model';
import { MunicipioV7Service } from './municipio-v7.service';

@Component({
  selector: 'app-municipio-list',
  templateUrl: './municipio-list.component.html',
  styleUrls: ['./municipio-v7.component.css']
})
export class MunicipioListComponent implements OnInit {
  municipios: IMunicipio[];

  constructor(private router: Router, private municipioService: MunicipioV7Service) {

  }


  ngOnInit() {
    this.municipioService.getMunicipios()
      .subscribe( data => {
        this.municipios = data;
        console.log(this.municipios);
      });
  }

  deleteMunicipio(municipio: Municipio): void {
    this.municipioService.deleteMunicipio(municipio)
      .subscribe( data => {
        this.municipios = this.municipios.filter(u => u !== municipio);
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMunicipio, Municipio } from '../shared/model/municipio.model';
import { MunicipioV5Service } from './municipio-v5.service';

@Component({
  selector: 'app-municipio-list',
  templateUrl: './municipio-list.component.html',
  styleUrls: ['./municipio-v5.component.css']
})
export class MunicipioListComponent implements OnInit {
  municipios: IMunicipio[];

  constructor(private router: Router, private municipioService: MunicipioV5Service) {

  }


  ngOnInit() {
    this.municipioService.getMunicipios()
      .subscribe( data => {
        this.municipios = data;
        console.log(this.municipios);
      });
  }


}

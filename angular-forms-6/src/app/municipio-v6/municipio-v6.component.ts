import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMunicipio, Municipio, Estado } from '../shared/model/municipio.model';
import { MunicipioV6Service } from './municipio-v6.service';

@Component({
  selector: 'app-municipio-v6',
  templateUrl: './municipio-v6.component.html',
  styleUrls: ['./municipio-v6.component.css']
})
export class MunicipioV6Component implements OnInit {
 municipio: IMunicipio = new Municipio() ;

  constructor(private router: Router, private municipioService: MunicipioV6Service) {

  }

  ngOnInit() {
  }

  save(): void {
      this.municipioService.createMunicipio(this.municipio)
      .subscribe( data => {
        alert('Municipio criado com sucesso.');
      });
  }
}



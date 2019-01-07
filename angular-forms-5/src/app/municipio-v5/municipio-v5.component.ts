import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMunicipio, Municipio, Estado } from '../shared/model/municipio.model';
import { MunicipioV5Service } from './municipio-v5.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-municipio-v5',
  templateUrl: './municipio-v5.component.html',
  styleUrls: ['./municipio-v5.component.css']
})
export class MunicipioV5Component implements OnInit {
 municipio: IMunicipio = new Municipio();

  constructor(private router: Router, private municipioService: MunicipioV5Service) {
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



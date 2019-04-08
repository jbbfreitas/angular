import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMunicipio, Municipio, Estado } from '../shared/model/municipio.model';
import { MunicipioV7Service } from './municipio-v7.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-municipio-v7',
  templateUrl: './municipio-v7.component.html',
  styleUrls: ['./municipio-v7.component.css']
})
export class MunicipioV7Component implements OnInit {
 municipio: IMunicipio ;

  constructor(private router: Router, private municipioService: MunicipioV7Service,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ municipio }) => {
        this.municipio = municipio;
    });

  }

  save(): void {
    if (this.municipio.id === undefined) {
      this.municipioService.createMunicipio(this.municipio)
      .subscribe( data => {
        alert('Municipio criado com sucesso.');
      });

    } else {
      this.municipioService.updateMunicipio(this.municipio)
      .subscribe( data => {
        alert('Municipio atualizado com sucesso.');
      });

    }

  }
}



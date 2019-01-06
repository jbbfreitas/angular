import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMunicipio, Municipio, Estado } from '../shared/model/municipio.model';
import { MunicipioV6Service } from './municipio-v6.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-municipio-v6',
  templateUrl: './municipio-v6.component.html',
  styleUrls: ['./municipio-v6.component.css']
})
export class MunicipioV6Component implements OnInit {
 municipio: IMunicipio ;

  constructor(private router: Router, private municipioService: MunicipioV6Service,
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



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
 municipio: IMunicipio ;

  constructor(private router: Router, private municipioService: MunicipioV5Service,
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



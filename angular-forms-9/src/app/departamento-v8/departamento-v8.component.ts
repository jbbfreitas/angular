import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDepartamento, Departamento } from '../shared/model/departamento.model';
import { IMunicipio } from '../shared/model/municipio.model';
import { DepartamentoV8Service } from './departamento-v8.service';
import { ActivatedRoute } from '@angular/router';
import {MunicipioV7Service } from '../municipio-v7/municipio-v7.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-departamento-v8',
  templateUrl: './departamento-v8.component.html',
  styleUrls: ['./departamento-v8.component.css']
})
export class DepartamentoV8Component implements OnInit {
 departamento: IDepartamento ;
 municipios: IMunicipio[];

  constructor(private router: Router, private departamentoService: DepartamentoV8Service,
    private municipioService: MunicipioV7Service, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ departamento }) => {
        this.departamento = departamento;
    });
    this.municipioService.getMunicipios().subscribe(
      data => {
          this.municipios = data;
      }
  );


  }

  save(): void {
    if (this.departamento.id === undefined) {
      this.departamentoService.createDepartamento(this.departamento)
      .subscribe( data => {
        alert('Departamento criado com sucesso.');
      });

    } else {
      this.departamentoService.updateDepartamento(this.departamento)
      .subscribe( data => {
        alert('Departamento atualizado com sucesso.');
      });

    }

  }
  trackMunicipioById(index: number, item: IMunicipio) {
    return item.id;
}

}



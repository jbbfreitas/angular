import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDepartamento, Departamento } from '../shared/model/departamento.model';
import { IMunicipio } from '../shared/model/municipio.model';
import { DepartamentoV8Service } from '../departamento-v8/departamento-v8.service';
import { ActivatedRoute } from '@angular/router';
import {MunicipioV7Service } from '../municipio-v7/municipio-v7.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IEmpregado } from '../shared/model/empregado.model';
import { EmpregadoV9Service } from '../empregado-v9/empregado-v9.service';

@Component({
  selector: 'app-empregado-v9',
  templateUrl: './empregado-v9.component.html',
  styleUrls: ['./empregado-v9.component.css']
})
export class EmpregadoV9Component implements OnInit {
 empregado: IEmpregado;
 departamentos: IDepartamento[] ;
 municipios: IMunicipio[];

  constructor(private router: Router, private empregadoService: EmpregadoV9Service,
    private departamentoService: DepartamentoV8Service,
    private municipioService: MunicipioV7Service, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ empregado }) => {
        this.empregado = empregado;
    });
    this.municipioService.getMunicipios().subscribe(
      data => {
          this.municipios = data;
    });
    this.departamentoService.getDepartamentos().subscribe(
      data => {
          this.departamentos = data;
    });
  }

  save(): void {
    if (this.empregado.id === undefined) {
      this.empregadoService.createEmpregado(this.empregado)
      .subscribe( data => {
        alert('Empregado criado com sucesso.');
      });

    } else {
      this.empregadoService.updateEmpregado(this.empregado)
      .subscribe( data => {
        alert('Empregado atualizado com sucesso.');
      });

    }
  }
  trackMunicipioById(index: number, item: IMunicipio) {
    return item.id;
  }


  trackDepartamentoById(index: number, item: IDepartamento) {
    return item.id;
  }
}



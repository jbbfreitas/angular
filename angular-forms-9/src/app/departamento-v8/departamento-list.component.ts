import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDepartamento, Departamento } from '../shared/model/departamento.model';
import { DepartamentoV8Service } from './departamento-v8.service';

@Component({
  selector: 'app-departamento-list',
  templateUrl: './departamento-list.component.html',
  styleUrls: ['./departamento-v8.component.css']
})
export class DepartamentoListComponent implements OnInit {
  departamentos: IDepartamento[];

  constructor(private router: Router, private departamentoService: DepartamentoV8Service) {

  }


  ngOnInit() {
    this.departamentoService.getDepartamentos()
      .subscribe( data => {
        this.departamentos = data;
        console.log(this.departamentos);
      });
  }

  deleteDepartamento(departamento: Departamento): void {
    this.departamentoService.deleteDepartamento(departamento)
      .subscribe( data => {
        this.departamentos = this.departamentos.filter(u => u !== departamento);
      });
  }

}

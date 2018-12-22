import { Component, OnInit } from '@angular/core';
import { Departamento } from './departamento.model';
@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  departamento: Departamento;
  constructor(
  ) { }
  ngOnInit() {
  }

}

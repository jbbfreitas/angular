import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEmpregado, Empregado } from '../shared/model/empregado.model';
import { EmpregadoV9Service } from './empregado-v9.service';

@Component({
  selector: 'app-empregado-list',
  templateUrl: './empregado-list.component.html',
  styleUrls: ['./empregado-v9.component.css']
})
export class EmpregadoListComponent implements OnInit {
  empregados: IEmpregado[];

  constructor(private router: Router, private empregadoService: EmpregadoV9Service) {

  }


  ngOnInit() {
    this.empregadoService.getEmpregados()
      .subscribe( data => {
        this.empregados = data;
        console.log(this.empregados);
      });
  }

  deleteEmpregado(empregado: Empregado): void {
    this.empregadoService.deleteEmpregado(empregado)
      .subscribe( data => {
        this.empregados = this.empregados.filter(u => u !== empregado);
      });
  }

}

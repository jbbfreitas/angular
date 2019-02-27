import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-municipio-v1',
  templateUrl: './municipio-v1.component.html',
  styleUrls: ['./municipio-v1.component.css']
})
export class MunicipioV1Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  gravar(form: any): void {
    console.log('Você submeteu o formulário:', form);
    console.log ('O nome do municipio é', form.nomeMunicipio);
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMunicipio } from '../../../app/shared/model/municipio.model';
import { MunicipioService } from './municipio.service';


@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.css']
})
export class MunicipioComponent implements OnInit, OnDestroy {
  municipios: IMunicipio[];
  constructor( private municipioService: MunicipioService) {
   }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}

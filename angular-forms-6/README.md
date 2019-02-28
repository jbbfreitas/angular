# Angular Forms V6

Na  versão (V6) vamos ampliar a funcionalidade de nossa aplicação criando a possibilidade de excluir um município. 

Para isso termos que :
 
1. Editar `MunicipioService` para o conteúdo da Listagem 1

```typescript
import { Injectable } from '@angular/core';
import { IMunicipio, Municipio } from '../shared/model/municipio.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class MunicipioV6Service {
  constructor(private http: HttpClient) {}

  private municipioUrl = '/api/municipios';


  createMunicipio(municipio: IMunicipio): any {
    return this.http.post<IMunicipio>(this.municipioUrl , municipio);
  }
  getMunicipios(): any {
    return this.http.get<IMunicipio[]>(this.municipioUrl );
  }
  deleteMunicipio(municipio: IMunicipio): any {
      return this.http.delete(this.municipioUrl + '/' + municipio.id);
  }

}

```
<p align="center">
    <strong>Listagem 1- Arquivo municipio-v6.service.ts</strong> 
</p>

::: :pushpin: Importante :::

> Observe o trecho de código abaixo extraído da Listagem 1

```typescript

(1)  deleteMunicipio(municipio: IMunicipio): any {
      return this.http.delete(this.municipioUrl + '/' + municipio.id);
  }
```
> Em (1) é declarado o método `deleteMunicipio`. Esse método utiliza o método `http.delete` e recebe como parâmetro  o `id` do município.

2. Edite a view para excluir um municipios, conforme Listagem 2

```html
<div class="container">
  <h2>Lista de Municipios</h2>

  <table class="rtable">
    <thead>
      <tr>
        <th class="hidden">Id</th>
        <th>Nome</th>
        <th>UF</th>
        <th>Excluir</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let municipio of municipios">
        <td> {{municipio.id}}</td>
        <td>{{municipio.nomeMunicipio}}</td>
        <td>{{municipio.uf}}</td>
        <td><button class="btndel" (click)="deleteMunicipio(municipio)">Excluir</button></td>
      </tr>
    </tbody>
  </table>
</div>
```
<p align="center">
    <strong>Listagem 2- Arquivo municipio-list.component.html</strong> 
</p>

3. Altere a classe `MunicipioListComponent`, conforme Listagem 3

```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMunicipio, Municipio } from '../shared/model/municipio.model';
import { MunicipioV6Service } from './municipio-v6.service';

@Component({
  selector: 'app-municipio-list',
  templateUrl: './municipio-list.component.html',
  styleUrls: ['./municipio-v6.component.css']
})
export class MunicipioListComponent implements OnInit {
  municipios: IMunicipio[];

  constructor(private router: Router, private municipioService: MunicipioV6Service) {

  }
  ngOnInit() {
    this.municipioService.getMunicipios()
      .subscribe( data => {
        this.municipios = data;
        console.log(this.municipios);
      });
  }

  deleteMunicipio(municipio: Municipio): void {
    this.municipioService.deleteMunicipio(municipio)
      .subscribe( data => {
        this.municipios = this.municipios.filter(u => u !== municipio);
      });
  }

}

```
<p align="center">
    <strong>Listagem 3- Arquivo municipio-list.component.ts</strong> 
</p>

> Observe o trecho de código abaixo extraído da Listagem 3

```typescript

(1) deleteMunicipio(municipio: Municipio): void {
    this.municipioService.deleteMunicipio(municipio)
      .subscribe( data => {
(2)        this.municipios = this.municipios.filter(u => u !== municipio);
      });
  }

```
> Em (1) é declarado o método `deleteMunicipio`. Esse método invoca o método de mesmo nome da classe `municipioService`.

> Em (2) é aplicado um filtro no array de municipio para não incluir o município que acaba de ser excluído.

4. Inicie o servidor usando a linha de comando abaixo e teste se a exclusão é bem sucedida:

```
npm start
```

Pronto, nesta  versão fizemos a implementação de um método para excluir um município com uma classe de dados `Municipio`.
 Na próxima versão [V7](README.V7.md)  vamos concluir o nosso CRUD para permitir alteração.

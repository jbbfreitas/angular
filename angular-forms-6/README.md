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
> Em (1) é declarado o método `deleteMunicipio`. Esse método utiliza o método `http.delete`. Esse método recebe como parâmetro  o id do município.

2. Edite a view para excluir um municipios, conforme Listagem

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



Pronto, nesta  versão fizemos a ligação com uma classe de dados `Municipio`
para quando o formulário for submetido, fosse criada uma instância dessa classe no formato JSON. Na próxima versão [V5](README.V5.md)  vamos criar uma classe de serviços.

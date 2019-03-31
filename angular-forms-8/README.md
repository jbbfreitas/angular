# Angular Forms V8

Na  versão (V8) vamos construir a funcionalidade de nossa aplicação para manter `Departamento`. 
Apesar de similiar à `Municipio`, tem algumas peculiaridades, dentre elas, o fato de o Departamento possuir
um relacionamento de `N:1` com `Municipio`.
Então vamos lá, mãos à obra:

Para ganharmos tempo e dada a similaridade entre Municipio e Departamento vamos usar a técnica copia e cola.


1. Copie a pasta `angular-forms-7` para `angular-forms-8`

2. Criar a classe `departamento-v8.component.ts` conforme o conteúdo da Listagem 1

```typescript
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
```
<p align="center">
    <strong>Listagem 1- Arquivo municipio-v7.service.ts</strong> 
</p>

::: :pushpin: Importante :::

> Observe o trecho de código abaixo extraído da Listagem 1

```typescript

(1)  updateMunicipio(municipio: IMunicipio): any {
    return this.http.put<IMunicipio>(this.municipioUrl , municipio);
  }
(2)  find(id: any): any {
    return this.http.get<IMunicipio>(this.municipioUrl + '/' + id);
  }

```
> Em (1) é declarado o método `updateMunicipio`. Esse método utiliza o método `http.put` e recebe como parâmetro  a instância de `município`.

> Em (2) é declarado o método `find`. Esse método utiliza o método `http.get` e recebe como parâmetro  a instância de `município`. Mais adiante ficará mais claro o 'porque' do método `find`.


2. Altere a view para permitir excluir e alterar um municipios, conforme Listagem 2

```html
<div class="container">
  <h2>Lista de Municipios</h2>

  <table class="rtable">
    <thead>
      <tr>
        <th class="hidden">Id</th>
        <th>Nome</th>
        <th>UF</th>

        <th>Editar</th>

        <th>Excluir</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let municipio of municipios">
        <td> {{municipio.id}}</td>
        <td>{{municipio.nomeMunicipio}}</td>
        <td>{{municipio.uf}}</td>
        <td><button type="submit" [routerLink]="['/municipio', municipio.id, 'edit']" class="btnedit">Editar</button></td>
        <td><button class="btndel" (click)="deleteMunicipio(municipio)">Excluir</button></td>
      </tr>
    </tbody>
  </table>
</div>

```
<p align="center">
    <strong>Listagem 2- Arquivo municipio-list.component.html</strong> 
</p>

3. Altere a classe `MunicipioV7Component`, conforme Listagem 3

```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMunicipio, Municipio, Estado } from '../shared/model/municipio.model';
import { MunicipioV7Service } from './municipio-v7.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-municipio-v7',
  templateUrl: './municipio-v7.component.html',
  styleUrls: ['./municipio-v7.component.css']
})
export class MunicipioV7Component implements OnInit {
 municipio: IMunicipio ;

  constructor(private router: Router, private municipioService: MunicipioV7Service,
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




```
<p align="center">
    <strong>Listagem 3- Arquivo municipio-v7.component.ts</strong> 
</p>

::: :pushpin: Importante :::
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

3. Altere a classe `AppRoutingModule`, conforme Listagem 4


```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {municipioRoute} from './municipio-v7/municipio-v7.route';

@NgModule({
  imports: [RouterModule.forRoot(municipioRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


```
<p align="center">
    <strong>Listagem 4- Arquivo app-routing.module.ts</strong> 
</p>
::: :pushpin: Importante :::

> Observe que nesta implementação estamos usando um Router para o munícipio (melhor prática) 

5. Altere a classe `MunicipioResolve`, conforme Listagem 5

```typescript
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MunicipioV7Service } from './municipio-v7.service';
import { MunicipioV7Component } from './municipio-v7.component';
import { IMunicipio, Municipio } from '../shared/model/municipio.model';
import {MunicipioListComponent} from './municipio-list.component';

@Injectable({ providedIn: 'root' })
export class MunicipioResolve implements Resolve<IMunicipio> {
    constructor(private service: MunicipioV7Service) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((municipio: HttpResponse<Municipio>) => municipio));
        }
        return of(new Municipio());
    }
}

export const municipioRoute: Routes = [
    {
        path: 'municipios',
        component: MunicipioListComponent
    },
    {
        path: 'municipio/new',
        component: MunicipioV7Component,
        resolve: {
            municipio: MunicipioResolve
        }
    },
    {
        path: 'municipio/:id/edit',
        component: MunicipioV7Component,
        resolve: {
            municipio: MunicipioResolve
        }

    }
];



```
<p align="center">
    <strong>Listagem 5- Arquivo municipio-v7.route.ts</strong> 
</p>

> Vamos explicar detalhadamente a Listagem 5. Primeiro vamos entender o que são `Resolvers`

###  ::: :mortar_board: Novo conceito :::

> O que são `Resolvers`?

> Quando um roteamento é usado em Angular, ocorre o seguinte fluxo:

  1. Usuário clica no link.
  2. O Angular executa determinado código e retorna um valor ou um objeto observável.
  3. Pode-se coletar o valor retornado ou o `observável` no `construtor` ou no `ngOnInit`, na classe do seu componente que está prestes a ser carregado.
  4. Os dados coletados são utilizados para um determinado propósito.
  5. O componente é carregado.

Ocorre que as Etapas 2,3 e 4 podem ser feitas com um código chamado `Resolver`.

Então, basicamente, o `Resolver` é esse código intermediário, que pode ser executado quando um link é clicado e antes de um componente ser carregado. Para se ter um `Resolver` é um preciso implementar uma interface que tem um único método `resolve()` 

```typescript
Metodo resolve()
resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T
Parameters
route 	ActivatedRouteSnapshot 	
state 	RouterStateSnapshot 	
Returns Observable<T> | Promise<T> | T

```
> Vamos explicar a nossa classe Resolver. Veja a Listagem 6.
```typescript
(1) export class MunicipioResolve implements Resolve<IMunicipio> {
    constructor(private service: MunicipioV7Service) {}

(2)    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((municipio: HttpResponse<Municipio>) => municipio));
        }
(3)        return of(new Municipio());
    }
}

```
<p align="center">
    <strong>Listagem 6- Explicando a classe MunicipioResolve</strong> 
</p>


> Em (1) temos a declaração da classe que implementa a interface `Resolve` (que é um `generics`);

> Em (2) temos o método `resolve()`. Esse método recebe dois parâmetros: uma `rota` e o `stauts`. No nosso caso a rota conterá `/municipio/1234` e o status conterá `edit` (vide linha abaixo extraída da Listagem 2). O método contém um `if`. Se o `id` for nulo o `resolve` retorna uma nova instância de município, senão retorna o `municipio` através do método `service.find`.


```typescript
        <td><button type="submit" [routerLink]="['/municipio', municipio.id, 'edit']" 
```
   

> Em (3) temos uma abreviação dos operadores RxJS .

Ao invés de:
```typeScript

    Observable.of()
    Observable.from()
    Observable.mergeMap()
```
Pode-se usar:
```typeScript

    of()
    from()
    mergeMap()

```


> Vamos colocar tudo isso em um diagrama de sequencia dos eventos, conforme Figura 1

<p align="center">
  <img src="/imagens/SequenciaEdit.png" alt="Diagrama de Sequência para edição de municipio">
</p>
<p align="center">
   <strong>Figura 1- Diagrama de Sequência para edição de municipio</strong> 
</p>

6. Pronto. Agora inicie o servidor usando a linha de comando abaixo e teste se a alteração é bem sucedida:

```
npm start
```

Pronto, nesta  versão fizemos a implementação de um método para alterar um município com uma classe de dados `Municipio`.
 Esta é a última implementação para `Municipio`.

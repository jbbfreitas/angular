# Angular Forms V9

Na  última versão (V9) vamos construir a funcionalidade de nossa aplicação para manter `Emprgado`. 
Apesar de similiar à `Departamento`, tem algumas peculiaridades, dentre elas, o fato de o Empregado possuir
um relacionamento de `N:1` com `Municipio` duas vezes: Municipio de nascimento e Municipio Residencial. Além disso `Empregado` também se relaciona com `Departamento` criado na V8.

Vamos matar mais essa? 
Então vamos lá, mãos à obra:

Para ganharmos tempo, e dada a similaridade entre Emoregada e Departamento, vamos usar a técnica copia e cola.


1. Copie a pasta `angular-forms-8` para `angular-forms-9`

2. Na pasta `app/shared/model`, crie a classe `Departamento` e a interface `IDepartamento` ambas no arquivo `departamento.model.ts` conforme o conteúdo da Listagem 1

```typescript
import { IMunicipio } from '../model/municipio.model';

export interface IDepartamento {
    id?: number;
    nomeDepartamento?: string;
    siglaDepartamento?: string;
    cnpj?: string;
    municipio?: IMunicipio;
}

export class Departamento implements IDepartamento {
    constructor(
        public id?: number,
        public nomeDepartamento?: string,
        public siglaDepartamento?: string,
        public cnpj?: string,
        public municipio?: IMunicipio
    ) {}
}

```
<p align="center">
    <strong>Listagem 1- Arquivo departamento.model.ts</strong> 
</p>

::: :pushpin: Importante :::

> Observe o trecho de código abaixo extraído da Listagem 1

```typescript
export interface IDepartamento {
    id?: number;
    nomeDepartamento?: string;
    siglaDepartamento?: string;
    cnpj?: string;
(1) municipio?: IMunicipio;
}
```
> Em (1) é declarado o `municipio` como sendo do tipo `IMunicipio`. Isso porque existe ai um relacionamento `N:1`.



3. Crie a pasta `app/departamento-v8` e nessa pasta, crie a classe `DepartamentoV8Service` no arquivo `departamento-v8.service.ts` conforme o conteúdo da Listagem 2


```typescript
import { Injectable } from '@angular/core';
import { IDepartamento, Departamento } from '../shared/model/departamento.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class DepartamentoV8Service {
  constructor(private http: HttpClient) {}

  private departamentoUrl = '/api/departamentos';


  createDepartamento(departamento: IDepartamento): any {
    return this.http.post<IDepartamento>(this.departamentoUrl , departamento);
  }
  getDepartamentos(): any {
    return this.http.get<IDepartamento[]>(this.departamentoUrl );
  }
  deleteDepartamento(departamento: IDepartamento): any {
      return this.http.delete(this.departamentoUrl + '/' + departamento.id);
  }
  updateDepartamento(departamento: IDepartamento): any {
    return this.http.put<IDepartamento>(this.departamentoUrl , departamento);
  }
  find(id: any): any {
    return this.http.get<IDepartamento>(this.departamentoUrl + '/' + id);
}


}


```
<p align="center">
    <strong>Listagem 2- Arquivo departamento-v8.service.ts</strong> 
</p>

::: :pushpin: Importante :::

> Observe que essa listagem é literalmente igual à sua correspondente para `Municipio` e, portanto, dispensa maiores comentérios.

4. Na pasta `app/departamento-v8`, crie a classe `DepartamentoV8Component` no arquivo `departamento-v8.component.ts` conforme o conteúdo da Listagem 3

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
    <strong>Listagem 3- Arquivo departamento-v8.component.ts</strong> 
</p>

::: :pushpin: Importante :::

> Observe o trecho de código abaixo extraído da Listagem 3

```typescript

export class DepartamentoV8Component implements OnInit {
 (1) departamento: IDepartamento ;
 (2) municipios: IMunicipio[];

  constructor(private router: Router, (3)private departamentoService: DepartamentoV8Service,
    (4)private municipioService: MunicipioV7Service, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ departamento }) => {
       (5) this.departamento = departamento;
    });
    this.municipioService.getMunicipios().subscribe(
      data => {
        (6)  this.municipios = data;
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
 (7) trackMunicipioById(index: number, item: IMunicipio) {
    return item.id;
}
```
> (1) - Declaração da variável `departamento`. Essa vairável será utilizada para mostrar os campos do `Departamento`

> (2) - Declara um array de municípios que será utilizada na combo para exibir e selecionar os municipios.

> (3),(4) - Injeção dos dois serviços que serão utilizados neste componente: MunicipioV7Service e DepartamentoV8Service

> (5),(6) - No método `ngOnInit` é feito uma busca na tabelas `Departamento` e `Municipio` associando-os às variáveis locais.

> (7) - Esse método será utilizado no carregamento da combo de municipions. Vide Listagem 4.



4. Agora vamos implementar a `view`.  Na pasta `app/departamento-v8`, crie o arquivo `departamento-v8.component.html`  conforme o conteúdo da Listagem 4


```html
<div class="container">

  <h2>Formulário de Entrada de Dados<small>Departamentos</small></h2>


  <form name="editForm" novalidate (ngSubmit)="save()" #editForm="ngForm">
    <div class="group">
      <input type="text" id="nomeDepartamento" name="nomeDepartamento" [(ngModel)]="departamento.nomeDepartamento" required minlength="3"
        maxlength="50">
      <div [hidden]="!(editForm.controls.nomeDepartamento?.dirty && editForm.controls.nomeDepartamento?.invalid)">
        <small class="form-text text-danger" [hidden]="!editForm.controls.nomeDepartamento?.errors?.required">
          Campo obrigatório.
        </small>
        <small class="ui error message" [hidden]="!(editForm.controls.nomeDepartamento?.dirty && editForm.controls.nomeDepartamento?.invalid)">
          Deve ter entre 3 e 50  caracteres.
        </small>
      </div> <span class="highlight"></span>
      <span class="bar"></span>
      <label for="nomeDepartamento">Nome do Departamento:</label>
    </div>

    <div class="group">
      <input type="text" id="siglaDepartamento" name="siglaDepartamento" [(ngModel)]="departamento.siglaDepartamento" required minlength="5"
        maxlength="5">
      <div [hidden]="!(editForm.controls.siglaDepartamento?.dirty && editForm.controls.siglaDepartamento?.invalid)">
        <small class="form-text text-danger" [hidden]="!editForm.controls.siglaDepartamento?.errors?.required">
          Campo obrigatório.
        </small>
        <small class="ui error message" [hidden]="!(editForm.controls.siglaDepartamento?.dirty && editForm.controls.siglaDepartamento?.invalid)">
          Deve ter 5 caracteres.
        </small>
      </div> <span class="highlight"></span>
      <span class="bar"></span>
      <label for="siglaDepartamento">Sigla do Departamento:</label>
    </div>
    <div class="group">
      <input type="text" id="cnpj" name="cnpj" [(ngModel)]="departamento.cnpj" required minlength="14"
        maxlength="14">
      <div [hidden]="!(editForm.controls.cnpj?.dirty && editForm.controls.cnpj?.invalid)">
        <small class="form-text text-danger" [hidden]="!editForm.controls.cnpj?.errors?.required">
          Campo obrigatório.
        </small>
        <small class="ui error message" [hidden]="!(editForm.controls.cnpj?.dirty && editForm.controls.cnpj?.invalid)">
          Deve ter 14 caracteres.
        </small>
      </div> <span class="highlight"></span>
      <span class="bar"></span>
      <label for="cnpj">CNPJ do Departamento:</label>
    </div>
   
    <div class="select">
      <select class="select-text" name="municipio" [(ngModel)]="departamento.municipio" id="field_municipio" required>
        <option [ngValue]="null"></option>
        <option [ngValue]="municipioOption.id === departamento.municipio?.id ? departamento.municipio : municipioOption" *ngFor="let municipioOption of municipios; trackBy: trackMunicipioById">{{municipioOption.nomeMunicipio}}</option>
      </select>
      <div [hidden]="!(editForm.controls.departamento?.dirty && editForm.controls.departamento?.invalid)">
        <small class="form-text text-danger" [hidden]="!editForm.controls.departamento?.errors?.required">
          Selecione um Municipio obrigatoriamente.
        </small>
      </div>
      <span class="select-highlight"></span>
      <span class="select-bar"></span>
      <label class="select-label" for="Municipio">Municipio:</label>
    </div>
    <div class="buttons">
      <div [hidden]="editForm.form.invalid ">
        <button type="submit" class="button">Gravar</button>
      </div>
      <div [hidden]="!editForm.form.invalid ">
        <button disabled class="button disabled">Gravar</button>
      </div>
    </div>
  </form>
</div>


```
<p align="center">
    <strong>Listagem 4- Arquivo departamento-v8.component.html</strong> 
</p>

::: :pushpin: Importante :::

> Observe o trecho de código abaixo, extraído da Listagem 4

```typescript
      <select class="select-text" name="municipio" [(ngModel)]="departamento.municipio" id="field_municipio" required>
        <option [ngValue]="null"></option>
        <option [ngValue]="municipioOption.id === departamento.municipio?.id ? departamento.municipio : municipioOption" *ngFor="let municipioOption of municipios; trackBy: trackMunicipioById">{{municipioOption.nomeMunicipio}}</option>
      </select>

```

> Esse é o trecho de código que apresenta novidades, permitindo que seja apresentada, para seleção pelo usuário, uma combo contendo os municípios cadastrados. Observe atentamente a tag `<option></option>` que possui como parâmetros a diretiva `*ngFor` e o `trackBy`. A diretiva `*ngFor` faz uma iteração na coleção `municipios`, declarada no componente `departamento-v8.component.ts`. Já o parâmetro `trackBy` aponta para o método `trackMunicipioById`, também declarado no  componente `departamento-v8.component.ts`. Se você analisar esse método, verá que ele simplesmente retorna o `id` do `municipio`. A função do método `trackBy` é permitir que o Angular identifique, via um `id`,  qual o item está sendo adicionado ou removido.



5. Agora vamos implementar o componente que exibe a lista de departamentos. Primeiramente é preciso criar o componenente `DepartamentoListComponent`, conforme Listagem 5.

```typescript
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


```
<p align="center">
    <strong>Listagem 5- Arquivo departamento-list.component.ts</strong> 
</p>

::: :pushpin: Importante :::

> Esse componente não apresenta nenhuma novidade em relação ao que foi realizado para `Município`.



6. Agora vamos implementar a view do componente, conforme Listagem 6.

```html
<div class="container">
  <h2>Lista de Departamentos</h2>

  <table class="rtable">
    <thead>
      <tr>
        <th class="hidden">Id</th>
        <th>Nome</th>
        <th>Sigla</th>
        <th>Editar</th>
        <th>Excluir</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let departamento of departamentos">
        <td> {{departamento.id}}</td>
        <td>{{departamento.nomeDepartamento}}</td>
        <td>{{departamento.siglaDepartamento}}</td>

        <td><button type="submit" [routerLink]="['/departamento', departamento.id, 'edit']" class="btnedit">Editar</button></td>
        <td><button class="btndel" (click)="deleteDepartamento(departamento)">Excluir</button></td>
      </tr>
    </tbody>
  </table>
</div>

```
<p align="center">
    <strong>Listagem 6- Arquivo departamento-list.component.html</strong> 
</p>

::: :pushpin: Importante :::

> Esse componente não apresenta nenhuma novidade em relação ao que foi realizado para `Município`, exceto pelo fato de exibir o nome do departamento e a sua sigla.

7. A seguir faremos a implementação do `route` e do `resolve` para o `departamento`. Conforme dissemos anteriormente é uma boa prática usar um `route` para cada caso de uso. É exatamente isso que faremos. Crie o componente `DepartamentoResolve`, conforme Listagem 7.

```typescript
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DepartamentoV8Service } from './departamento-v8.service';
import { DepartamentoV8Component } from './departamento-v8.component';
import { IDepartamento, Departamento } from '../shared/model/departamento.model';
import {DepartamentoListComponent} from './departamento-list.component';

@Injectable({ providedIn: 'root' })
export class DepartamentoResolve implements Resolve<IDepartamento> {
    constructor(private service: DepartamentoV8Service) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((departamento: HttpResponse<Departamento>) => departamento));
        }
        return of(new Departamento());
    }
}

export const departamentoRoute: Routes = [
    {
        path: 'departamentos',
        component: DepartamentoListComponent
    },
    {
        path: 'departamento/new',
        component: DepartamentoV8Component,
        resolve: {
            departamento: DepartamentoResolve
        }
    },
    {
        path: 'departamento/:id/edit',
        component: DepartamentoV8Component,
        resolve: {
            departamento: DepartamentoResolve
        }

    }
];


```
<p align="center">
    <strong>Listagem 7- Arquivo departamento-v8.route.ts</strong> 
</p>

::: :pushpin: Importante :::

> Esse componente não apresenta nenhuma novidade em relação ao que foi realizado para `Município`, portanto não faremos maiores comentários.

8. A seguir vamos criar o componente `DepartamentoRoutingModule`. Vamos também renomerar `AppRoutingModule`, criado na versão v7 para `MunicipioRoutingModule`. Havíamos usado `AppRoutingModule` por que só existia um caso de uso, agora temos dois. Então vamos lá, na pasta `app` (observe que esse componente será criado na pasta `app`)  crie o componente `DepartamentoRoutingModule`, conforme Listagem 8.


```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {departamentoRoute} from './departamento-v8/departamento-v8.route';

@NgModule({
  imports: [RouterModule.forRoot(departamentoRoute)],
  exports: [RouterModule]
})
export class DepartamentoRoutingModule { }
```
<p align="center">
    <strong>Listagem 8- Arquivo departamento-routing.module.ts</strong> 
</p>

::: :pushpin: Importante :::

> Esse componente serve apenas para declarar outro componente `departamentoRoute`, criado na Listagem 8. Esse é o comportamento  típico do Angular: componentes referenciando outros componentes.

9. Em seguida renomeie o componente `AppRoutingModule` para `MunicipioRoutingModule`. Renomeie também o arquivo de `app-routing.module.ts` para `municipio-routing.module.ts` . O arquivo deverá ficar como na Listagem 9.

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {municipioRoute} from './municipio-v7/municipio-v7.route';

@NgModule({
  imports: [RouterModule.forRoot(municipioRoute)],
  exports: [RouterModule]
})
export class MunicipioRoutingModule { }

```
<p align="center">
    <strong>Listagem 9- Arquivo municipio-routing.module.ts</strong> 
</p>

10. Como penúltima etapa vamos alterar o módulo principal da nossa aplicação: `AppModule`, conforme Listagem 10.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MunicipioRoutingModule } from './municipio-routing.module';
import { DepartamentoRoutingModule } from './departamento-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MunicipioV7Component } from './municipio-v7/municipio-v7.component';
import { MunicipioListComponent } from './municipio-v7/municipio-list.component';
import { DepartamentoV8Component } from './departamento-v8/departamento-v8.component';
import { DepartamentoListComponent } from './departamento-v8/departamento-list.component';
import {HttpClientModule} from '@angular/common/http';
import { MunicipioV7Service } from './municipio-v7/municipio-v7.service';
import { DepartamentoV8Service } from './departamento-v8/departamento-v8.service';
import {municipioRoute} from './municipio-v7/municipio-v7.route';
import {departamentoRoute} from './departamento-v8/departamento-v8.route';
import { RouterModule } from '@angular/router';

const ENTITY_STATES = [...municipioRoute, ...departamentoRoute];
@NgModule({
  declarations: [
    AppComponent,
    MunicipioV7Component,
    MunicipioListComponent,
    DepartamentoV8Component,
    DepartamentoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MunicipioRoutingModule, DepartamentoRoutingModule, HttpClientModule,
    RouterModule.forChild(ENTITY_STATES)
  ],
  providers: [MunicipioV7Service, DepartamentoV8Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
<p align="center">
    <strong>Listagem 10- Arquivo app.module.ts</strong> 
</p>

::: :pushpin: Importante :::

> Observe que esse componente agora declara `DepartamentoV8Component`, `DepartamentoListComponent`, `DepartamentoRoutingModule` e `DepartamentoV8Service`. 

11. Altere o menu principal da aplicação para apresentar os novos links, conforme Listagem 11.

```html
<div class="container">
  
    <h2>
      Gerenciamento de Municípios e Departamentos
    </h2>
  

  <a routerLink="/municipios"> Listar Municipios</a>
  <a style="margin-left:10px" routerLink="/municipio/new">Novo Municipio</a>
  <br />
  <a routerLink="/departamentos"> Listar Departamentos</a>
  <a style="margin-left:10px" routerLink="/departamento/new">Novo Departamento</a>
  <br />
  <router-outlet></router-outlet>
</div>

```

12. Pronto. Agora inicie o servidor usando a linha de comando abaixo e teste se a implementação foi bem sucedida:

```
npm start
```

12. Se notar que o Municipio selecionado na combo de municipios não está sendo persistida, comente o trecho de código no arquivo `Departamento.java`. O comando `@JsonIgnore()` impede que o Json de Município seja encaminhado para o servidor.

```java
  @ManyToOne
 //   @JsonIgnore()
    private Municipio municipio;

```

Parabéns, você concluiu o estudo de caso `Manter Departamentos`. 

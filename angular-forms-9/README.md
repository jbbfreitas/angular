# Angular Forms V9

Na  última versão (V9) vamos construir a funcionalidade de nossa aplicação para manter `Emprgado`. 
Apesar de similiar à `Departamento`, tem algumas peculiaridades, dentre elas, o fato de o Empregado possuir
um relacionamento de `N:1` com `Municipio` duas vezes: Municipio de nascimento e Municipio Residencial. Além disso `Empregado` também se relaciona com `Departamento` criado na V8. Finalmente há uma outra novidade: a classe `Emregado` irá trabalhar com datas, então vamos precisar importar a classe `moment`.

Vamos matar mais essa? 
Então vamos lá, mãos à obra:

Para ganharmos tempo, e dada a similaridade entre Emoregada e Departamento, vamos usar a técnica copia e cola.


1. Copie a pasta `angular-forms-8` para `angular-forms-9`

2. Instale a classe `moment`. No `prompt` digite 

> `npm install moment --save`

::: :pushpin: Importante :::

> Essa classe permite trabalhar com datas no Angular.



3. Na pasta `app/shared/model`, crie a classe `Empregado` e a interface `IEmpregado` ambas no arquivo `empregado.model.ts` conforme o conteúdo da Listagem 1

```typescript
import { Moment } from 'moment';
import { IMunicipio } from '../model/municipio.model';
import { IDepartamento } from '../model/departamento.model';

export interface IEmpregado {
    id?: number;
    nomeEmpregado?: string;
    dataNascimento?: Moment;
    cpf?: string;
    dataAdmissao?: Moment;
    dataDemissao?: Moment;
    dataObito?: Moment;
    municipioNascimento?: IMunicipio;
    municipioResidencial?: IMunicipio;
    departamento?: IDepartamento;
}

export class Empregado implements IEmpregado {
    constructor(
        public id?: number,
        public nomeEmpregado?: string,
        public dataNascimento?: Moment,
        public cpf?: string,
        public dataAdmissao?: Moment,
        public dataDemissao?: Moment,
        public dataObito?: Moment,
        public municipioNascimento?: IMunicipio,
        public municipioResidencial?: IMunicipio,
        public departamento?: IDepartamento
    ) {}
}

```
<p align="center">
    <strong>Listagem 1- Arquivo empregado.model.ts</strong> 
</p>

::: :pushpin: Importante :::

> Observe o trecho de código abaixo extraído da Listagem 1

```typescript
(1)import { Moment } from 'moment';
...
(2)        public dataNascimento?: Moment,
(3)        public dataAdmissao?: Moment,
(4)        public dataDemissao?: Moment
(5)        public dataObito?: Moment,


}
```
> Em (1) está sendo importada a classe `Moment` que será usada nas 4 datas da classe `Empregado`.

> Em (2),(3),(4) e (5) estão sendo declaradas variáveis data que são do tipo  `Moment` .


3. Crie a pasta `app/empregado-v9` e nessa pasta, crie a classe `EmpregadoV9Service` no arquivo `empregado-v9.service.ts` conforme o conteúdo da Listagem 2


```typescript
import { Injectable } from '@angular/core';
import { IEmpregado, Empregado } from '../shared/model/empregado.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class EmpregadoV9Service {
  constructor(private http: HttpClient) {}

  private empregadoUrl = '/api/empregados';


  createEmpregado(empregado: IEmpregado): any {
    return this.http.post<IEmpregado>(this.empregadoUrl , empregado);
  }
  getEmpregados(): any {
    return this.http.get<IEmpregado[]>(this.empregadoUrl );
  }
  deleteEmpregado(empregado: IEmpregado): any {
      return this.http.delete(this.empregadoUrl + '/' + empregado.id);
  }
  updateEmpregado(empregado: IEmpregado): any {
    return this.http.put<IEmpregado>(this.empregadoUrl , empregado);
  }
  find(id: any): any {
    return this.http.get<IEmpregado>(this.empregadoUrl + '/' + id);
}
}
```
<p align="center">
    <strong>Listagem 2- Arquivo empregado-v9.service.ts</strong> 
</p>

::: :pushpin: Importante :::

>Observe que, guardadas as devidas proporções essa classe é igual à `DepartamentoV8Service` e, portanto, dispensa maiores comentérios.

4. Na pasta `app/empregado-v9`, crie a classe `EmpregadoV9Component` no arquivo `empregado-v9.component.ts` conforme o conteúdo da Listagem 3

```typescript
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
  styleUrls: ['./departamento-v8.component.css']
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
```
<p align="center">
    <strong>Listagem 3- Arquivo empregado-v9.component.ts</strong> 
</p>

::: :pushpin: Importante :::

> Observe o trecho de código abaixo extraído da Listagem 3

```typescript

export class EmpregadoV9Component implements OnInit {
 (1)empregado: IEmpregado;
 (2)departamentos: IDepartamento[] ;
 (3)municipios: IMunicipio[];

 (4) constructor(private router: Router, private empregadoService: EmpregadoV9Service,
    private departamentoService: DepartamentoV8Service,
    private municipioService: MunicipioV7Service, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ empregado }) => {
        this.empregado = empregado;
    });
 (5)   this.municipioService.getMunicipios().subscribe(
      data => {
          this.municipios = data;
    });
 (6)   this.departamentoService.getDepartamentos().subscribe(
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
 (7) trackMunicipioById(index: number, item: IMunicipio) {
    return item.id;
  }


 (8) trackDepartamentoById(index: number, item: IDepartamento) {
    return item.id;
  }
}
```
> (1) - Declaração da variável `empregado`. Essa vairável será utilizada para mostrar os campos do `Empregado`

> (2),(3) - Declara dois arrays, um de departamentos e outro para municípios que serão utilizados nas combos para exibir e selecionar os municipios e o departamento.

> (4) - Injeção dos três serviços que serão utilizados neste componente: MunicipioV7Service, DepartamentoV8Service e EmpregadoV9Service.

> (5),(6) - No método `ngOnInit` é feito uma busca na tabelas `Departamento` e `Municipio` associando-os às variáveis locais.

> (7) - Esse método será utilizado no carregamento da combo de municipions. Vide Listagem 4.

> (8) - Esse método será utilizado no carregamento da combo de departamentos. Vide Listagem 4.


4. Agora vamos implementar a `view`.  Na pasta `app/empregado-v9`, crie o arquivo `empregado-v9.component.html`  conforme o conteúdo da Listagem 4


```html
<div class="row justify-content-center">
  <div class="col-8">
    <form name="editForm" novalidate (ngSubmit)="save()" #editForm="ngForm">
      <h2>Criar ou editar um Empregado</h2>
      <div>
        <div class="form-group" [hidden]="!empregado.id">
          <label for="id">ID</label>
          <input type="text" class="form-control" id="id" name="id" [(ngModel)]="empregado.id" readonly />
        </div>
        <h2></h2>
        <div class="group">
          <input type="text" id="nomeEmpregado" name="nomeEmpregado" [(ngModel)]="empregado.nomeEmpregado" required
            minlength="3" maxlength="80">
          <div [hidden]="!(editForm.controls.nomeEmpregado?.dirty && editForm.controls.nomeEmpregado?.invalid)">
            <small class="form-text text-danger" [hidden]="!editForm.controls.nomeEmpregado?.errors?.required">
              Campo obrigatório.
            </small>
            <small class="ui error message"
              [hidden]="!(editForm.controls.nomeEmpregado?.dirty && editForm.controls.nomeEmpregado?.invalid)">
              Deve ter entre 10 e 80 caracteres.
            </small>
          </div> <span class="highlight"></span>
          <span class="bar"></span>
          <label for="nomeEmpregado">Nome do Empregado:</label>
        </div>
        <h2></h2>
        <div class="group">
          <input type="text" class="form-control" name="dataNascimento" id="field_dataNascimento"
            [(ngModel)]="empregado.dataNascimento" required minlength="10" maxlength="10" />
          <div [hidden]="!(editForm.controls.dataNascimento?.dirty && editForm.controls.dataNascimento?.invalid)">
            <small class="form-text text-danger" [hidden]="!editForm.controls.dataNascimento?.errors?.required">
              Obrigatório informar o nome do Empregado.
            </small>
            <small class="form-text text-danger" [hidden]="!editForm.controls.dataNascimento?.errors?.minlength">
              Data deve estar no formato AAAA-MM-DD.
            </small>
            <small class="form-text text-danger" [hidden]="!editForm.controls.dataNascimento?.errors?.maxlength">
              Data deve estar no formato AAAA-MM-DD.
            </small>
          </div> <span class="highlight"></span>
          <span class="bar"></span>
          <label for="field_dataNascimento">Data Nascimento:</label>
        </div>
        <h2></h2>
        <div class="group">
          <input type="text" class="form-control" name="cpf" id="field_cpf" [(ngModel)]="empregado.cpf" required
            minlength="11" maxlength="11" />
          <div [hidden]="!(editForm.controls.cpf?.dirty && editForm.controls.cpf?.invalid)">
            <small class="form-text text-danger" [hidden]="!editForm.controls.cpf?.errors?.required">
              CPF é obrigatório.
            </small>
            <small class="form-text text-danger" [hidden]="!editForm.controls.cpf?.errors?.minlength">
              Tamanho mímino 11.
            </small>
            <small class="form-text text-danger" [hidden]="!editForm.controls.cpf?.errors?.maxlength">
              Tamanho máximo 11.
            </small>
          </div> <span class="highlight"></span>
          <span class="bar"></span>
          <label for="field_cpf">CPF</label>
        </div>


        <h2></h2>
        <div class="group">
          <input type="text" class="form-control" name="dataAdmissao" id="field_dataAdmissao"
            [(ngModel)]="empregado.dataAdmissao" required minlength="10" maxlength="10" />
          <div [hidden]="!(editForm.controls.dataAdmissao?.dirty && editForm.controls.dataAdmissao?.invalid)">
            <small class="form-text text-danger" [hidden]="!editForm.controls.dataAdmissao?.errors?.required">
              Obrigatório informar a data de admissão.
            </small>
            <small class="form-text text-danger" [hidden]="!editForm.controls.dataAdmissao?.errors?.minlength">
              Data deve estar no formato AAAA-MM-DD.
            </small>
            <small class="form-text text-danger" [hidden]="!editForm.controls.dataAdmissao?.errors?.maxlength">
              Data deve estar no formato AAAA-MM-DD.
            </small>
          </div>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label for="field_dataAdmissao">Data de Admissao:</label>
        </div>



        <h2></h2>
        <div class="group">
          <input type="text" class="form-control" name="dataDemissao" id="field_dataDemissao"
            [(ngModel)]="empregado.dataDemissao" />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label for="field_dataDemissao">Data de Demissão:</label>
        </div>
        <h2></h2>
        <div class="group">
          <input type="text" class="form-control" name="dataObito" id="field_dataObito"
            [(ngModel)]="empregado.dataObito" />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label for="field_dataObito">Data de Óbito:</label>
        </div>

        <h2></h2>
        <div class="select">
          <select class="select-text" name="departamento" [(ngModel)]="empregado.departamento" id="field_departamento"
            required>
            <option [ngValue]="null"></option>
            <option
              [ngValue]="departamentoOption.id === empregado.departamento?.id ? empregado.departamento : departamentoOption"
              *ngFor="let departamentoOption of departamentos; trackBy: trackDepartamentoById">
              {{departamentoOption.nomeDepartamento}}</option>
          </select>
          <div [hidden]="!(editForm.controls.departamento?.dirty && editForm.controls.departamento?.invalid)">
            <small class="form-text text-danger" [hidden]="!editForm.controls.departamento?.errors?.required">
              Selecione um Departamento obrigatoriamente.
            </small>
          </div>
          <span class="select-highlight"></span>
          <span class="select-bar"></span>
          <label class="select-label" for="field_departamento">Departamento:</label>
        </div>
        <h2></h2>
        <div class="group">
          <div class="select">
            <select class="select-text" name="municipioNascimento" [(ngModel)]="empregado.municipioNascimento"
              id="field_municipioNascimento" required>
              <option [ngValue]="null"></option>
              <option
                [ngValue]="municipioOption.id === empregado.municipioNascimento?.id ? empregado.municipioNascimento : municipioOption"
                *ngFor="let municipioOption of municipios; trackBy: trackMunicipioById">
                {{municipioOption.nomeMunicipio}}</option>
            </select>
            <div
              [hidden]="!(editForm.controls.municipioNascimento?.dirty && editForm.controls.municipioNascimento?.invalid)">
              <small class="form-text text-danger" [hidden]="!editForm.controls.municipioNascimento?.errors?.required">
                Selecione um Municipio obrigatoriamente.
              </small>
            </div>
            <span class="select-highlight"></span>
            <span class="select-bar"></span>
            <label class="select-label" for="field_municipioNascimento">Municipio Nascimento:</label>
          </div>
        </div>
        <h2></h2>
        <div class="group">
          <div class="select">
            <select class="select-text" name="municipioResidencial" [(ngModel)]="empregado.municipioResidencial"
              id="field_municipioResidencial" required>
              <option [ngValue]="null"></option>
              <option
                [ngValue]="municipioOption.id === empregado.municipioResidencial?.id ? empregado.municipioResidencial : municipioOption"
                *ngFor="let municipioOption of municipios; trackBy: trackMunicipioById">
                {{municipioOption.nomeMunicipio}}</option>
            </select>
            <div
              [hidden]="!(editForm.controls.municipioResidencial?.dirty && editForm.controls.municipioResidencial?.invalid)">
              <small class="form-text text-danger" [hidden]="!editForm.controls.municipioResidencial?.errors?.required">
                Selecione um Municipio Residencial obrigatoriamente.
              </small>
            </div>
            <span class="select-highlight"></span>
            <span class="select-bar"></span>
            <label class="select-label" for="field_municipioNascimento">Municipio Residencial:</label>
          </div>
        </div>

        <div class="buttons">
          <div [hidden]="editForm.form.invalid ">
            <button type="submit" class="button">Gravar</button>
          </div>
          <div [hidden]="!editForm.form.invalid ">
            <button disabled class="button disabled">Gravar</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
```
<p align="center">
    <strong>Listagem 4- Arquivo empregado-v9.component.html</strong> 
</p>

::: :pushpin: Importante :::

> Esse arquivo, apesar de longo, não traz nenhuma novidade em relação a `departamento-v8.component.html`, razão pela qual dispensa maiores comentários


5. Agora vamos implementar o componente que exibe a lista de empregados. Primeiramente é preciso criar o componenente `EmpregadoListComponent`, conforme Listagem 5.

```typescript
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

```
<p align="center">
    <strong>Listagem 5- Arquivo empregado-list.component.ts</strong> 
</p>

::: :pushpin: Importante :::

> Esse componente não apresenta nenhuma novidade em relação ao que foi realizado para `Departamento`.



6. Agora vamos implementar a view do componente, conforme Listagem 6.

```html
<div class="container">
  <h2>Lista de Empregados</h2>

  <table class="rtable">
    <thead>
      <tr>
        <th class="hidden">Id</th>
        <th>Nome</th>
        <th>Departamento</th>

        <th>Editar</th>

        <th>Excluir</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let empregado of empregados">
        <td> {{empregado.id}}</td>
        <td>{{empregado.nomeEmpregado}}</td>
        <td>{{empregado.departamento.nomeDepartamento}}</td>

        <td><button type="submit" [routerLink]="['/empregado', empregado.id, 'edit']" class="btnedit">Editar</button>
        </td>
        <td><button class="btndel" (click)="deleteEmpregado(empregado)">Excluir</button></td>
      </tr>
    </tbody>
  </table>
</div>


```
<p align="center">
    <strong>Listagem 6- Arquivo empregado-list.component.html</strong> 
</p>

::: :pushpin: Importante :::

> Esse componente não apresenta nenhuma novidade em relação ao que foi realizado para `Departamento`, exceto pelo fato de exibir o nome do departamento usando `{{empregado.departamento.nomeDepartamento}}`.

7. A seguir faremos a implementação do `route` e do `resolve` para o `empregado`. Conforme dissemos anteriormente é uma boa prática usar um `route` para cada caso de uso. É exatamente isso que faremos. Crie o componente `EmpregadoResolve`, conforme Listagem 7.

```typescript
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmpregadoV9Service } from './empregado-v9.service';
import { EmpregadoV9Component } from './empregado-v9.component';
import { IEmpregado, Empregado } from '../shared/model/empregado.model';
import {EmpregadoListComponent} from './empregado-list.component';

@Injectable({ providedIn: 'root' })
export class EmpregadoResolve implements Resolve<IEmpregado> {
    constructor(private service: EmpregadoV9Service) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((empregado: HttpResponse<Empregado>) => empregado));
        }
        return of(new Empregado());
    }
}

export const empregadoRoute: Routes = [
    {
        path: 'empregados',
        component: EmpregadoListComponent
    },
    {
        path: 'empregado/new',
        component: EmpregadoV9Component,
        resolve: {
            empregado: EmpregadoResolve
        }
    },
    {
        path: 'empregado/:id/edit',
        component: EmpregadoV9Component,
        resolve: {
            empregado: EmpregadoResolve
        }

    }
];

```
<p align="center">
    <strong>Listagem 7- Arquivo empregado-v9.route.ts</strong> 
</p>

::: :pushpin: Importante :::

> Esse componente não apresenta nenhuma novidade em relação ao que foi realizado para `Departamento`, portanto não faremos maiores comentários.

8. A seguir vamos criar o componente `EmpregadoRoutingModule`, conforme Listagem 8. Observe que este componente será criado diretamente na pasta `app`.


```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {empregadoRoute} from './empregado-v9/empregado-v9.route';

@NgModule({
  imports: [RouterModule.forRoot(empregadoRoute)],
  exports: [RouterModule]
})
export class EmpregadoRoutingModule { }
```
<p align="center">
    <strong>Listagem 8- Arquivo empregado-routing.module.ts</strong> 
</p>

::: :pushpin: Importante :::

> Esse componente serve apenas para declarar outro componente `empregadoRoute`, criado na Listagem 7. Esse é o comportamento  típico do Angular: componentes referenciando outros componentes.


9. Como penúltima etapa vamos alterar o módulo principal da nossa aplicação: `AppModule`, conforme Listagem 9.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MunicipioRoutingModule } from './municipio-routing.module';
import { MunicipioV7Component } from './municipio-v7/municipio-v7.component';
import { MunicipioListComponent } from './municipio-v7/municipio-list.component';
import { MunicipioV7Service } from './municipio-v7/municipio-v7.service';
import {municipioRoute} from './municipio-v7/municipio-v7.route';
import { DepartamentoRoutingModule } from './departamento-routing.module';
import { DepartamentoV8Component } from './departamento-v8/departamento-v8.component';
import { DepartamentoListComponent } from './departamento-v8/departamento-list.component';
import { DepartamentoV8Service } from './departamento-v8/departamento-v8.service';
import {departamentoRoute} from './departamento-v8/departamento-v8.route';
import { EmpregadoRoutingModule } from './empregado-routing.module';
import { EmpregadoV9Component } from './empregado-v9/empregado-v9.component';
import { EmpregadoListComponent } from './empregado-v9/empregado-list.component';
import { EmpregadoV9Service } from './empregado-v9/empregado-v9.service';
import {empregadoRoute} from './empregado-v9/empregado-v9.route';



const ENTITY_STATES = [...empregadoRoute, ...municipioRoute, ...departamentoRoute];
@NgModule({
  declarations: [
    AppComponent,
    MunicipioV7Component,
    MunicipioListComponent,
    DepartamentoV8Component,
    DepartamentoListComponent,
    EmpregadoV9Component,
    EmpregadoListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MunicipioRoutingModule,
    DepartamentoRoutingModule, EmpregadoRoutingModule, HttpClientModule,
    RouterModule.forChild(ENTITY_STATES)
  ],
  providers: [MunicipioV7Service, DepartamentoV8Service, EmpregadoV9Service],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
<p align="center">
    <strong>Listagem 09- Arquivo app.module.ts</strong> 
</p>

::: :pushpin: Importante :::

> Observe que esse componente agora também declara `EmpregadoV9Component`, `EmpregadoListComponent`, `EmpregadoRoutingModule` e `EmpregadoV9Service`. 

11. Altere o menu principal da aplicação para apresentar os novos links, conforme Listagem 10.

```html
<div class="container">
    <h2>
      Gerenciamento de Municípios, Departamentos e Empregados
    </h2>
  <a routerLink="/municipios"> Listar Municipios</a>
  <a style="margin-left:10px" routerLink="/municipio/new">Novo Municipio</a>
  <br />
  <a routerLink="/departamentos"> Listar Departamentos</a>
  <a style="margin-left:10px" routerLink="/departamento/new">Novo Departamento</a>
  <br />
  <a routerLink="/empregados"> Listar Empregados</a>
  <a style="margin-left:10px" routerLink="/empregado/new">Novo Empregado</a>
  <br />
  <router-outlet></router-outlet>
</div>

```

12. Pronto. Agora inicie o servidor usando a linha de comando abaixo e teste se a implementação foi bem sucedida:

```
npm start
```


Parabéns, você concluiu o estudo de caso `Manter Empregados`. 

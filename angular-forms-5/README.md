# Angular Forms V5

Na  versão (V5) vamos fazer ....


1. Habilitar o CORS

###  ::: :mortar_board: Novo conceito :::

Como o lado cliente de nossa aplicação Angular está sendo exeutada em um servidor (Node.js, no nosso caso) e o lador servidor está sendo executado em outro (TomCat), nós, teocricamente, deveríamos habilitar o CORS. 

Segundo o wikipedia, "Cross-origin resource sharing (CORS)(ou compartilhamento de recursos de origem cruzada) é uma especificação de uma tecnologia de navegadores que define meios para um servidor permitir que seus recursos sejam acessados por uma página web de um domínio diferente." 

Eu disse "teoricamente" por que isso seria realmente imperativo se estivéssemos executando cliente e servidor em máquinas distintas. Porém, no caso em tela, ambos os lados (cliente e servidor) estão em `localhost`. Portanto não será  necessessária essa configuração. 

Abaixo temos um exemplo que poderia ser utilizado.

```java
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
```
Há casos em que desejaremos que toda a aplicação esteja habilitada para CORS para um determinado servidor. Nesse caso não usaríamos a anotaçã `@CrossOrigin` mas sim uma configuração global na aplicação como no exemplo abaixo:

```java
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/greeting-javaconfig").allowedOrigins("http://localhost:4200");
            }
        };
    }
```

2. Configurar a aplicação para usar `routing`

###  ::: :mortar_board: Novo conceito :::

Iremos utilizar nesta versão uma espécie de menu. Esse menu terá apenas duas opções "Listar Municípios" e "Novo Município", entretanto, ao clicar em um destes itens de menu a aplicação deverá ser capaz de renderizar o componente correto, ou seja, carregar um recurso diferente usando uma URL diferente. Para que isso seja possível vamos utilizar um recurso do Angular denominado `"Routing"`.

> `Routing` é um mecanismo de rotear, redicionar uma URL para outra usando JavaScript. Nas aplicações que usam JSF-Java Server Faces esse roteamento é feito no servidor, mas, no Angular, o roteamento é feito no próprio cliente.

Para habilitar minimamente o uso de `Routing` no Angular serão necessários 3 passos:

  - 2.1 Alterar o arquivo `app.module.ts` para importar a biblioteca `AppRoutingModule`. Veja na Listagem 1 como deve ficar esse arquivo:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouting Module } from './app-routing.module'; //<<< Incluido
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MunicipioV5Component } from './municipio-v5/municipio-v5.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    MunicipioV5Component,
    MunicipioListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule, BrowserAnimationsModule, AppRoutingModule, //<<< Incluído
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

<p align="center">
  <strong>Listagem 1- Arquivo app.module.ts</strong> 
</p>

- 2.2- Criar o arquivo `app-routing.module.ts` para fazer a vinculação entre os componentes e o respectiva  URL. Em aplicações reais deve-se criar um arquivo `routing` para cada caso de uso. 
  


::: :+1: Boa Prática :::

**Como boa prática use um  arquivo `routing` para cada caso de uso. Por exemplo municipio-routing, empregado-routing etc**

```typescript
const routes: Routes = [ //<<< 1-Declara um constante
  { path: 'municipios', component: MunicipioListComponent }, //<<< 2-Liga URL a um componente
  { path: 'municipio/new', component: MunicipioV5Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] //<<< 3-Publica o roteamente
})
export class AppRoutingModule { }
```

 <p align="center">
    <strong>Listagem 2- Arquivo app-routing.module.ts</strong> 
</p>


::: :pushpin: Importante :::

> Observe na Listagem 1 que primeiramente é feita a declaração de uma constante denominada aqui de `routes`. Essa constante é um `array` contendo os dois links que usaremos. Em (3) a diretiva `exports` publica  as duas rotas que, então, poderão ser utilizadas na nossa aplicação.

- 2.3- Finalmente, será necessário configurar a `view` exibir o nosso `menu`. 
  

```html
<<div class="container">
    <h2>
      Gerenciamento de Municípios
    </h2>
  <a routerLink="/municipios"> Listar Municipios</a> <!--Primeiro link -->
  <a routerLink="/municipio/new" style="margin-left:10px" >Novo Municipio</a> <!--Segundo Link -->
  <br />
  <router-outlet></router-outlet> <!--Aqui serão renderizados os componentes -->
</div>

```
<p align="center">
    <strong>Listagem 3- Arquivo app-component.html</strong> 
</p>
3. Criar um componente para listar os municipios cadastrados

 

ng g component municipio-v5/municipio-list --flat

5. ng g service  municipio-v5/municipio-v5 --flat

6. Crie MunicipioService

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
export class MunicipioV5Service {

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
7. html para listar municipios
```html
<div class="col-md-6">
  <h2> Lista de Municipios</h2>

  <table class="table table-striped">
    <thead>
      <tr>
        <th class="hidden">Id</th>
        <th>Nome</th>
        <th>UF</th>
        <th>Ação</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let municipio of municipios">
        <td class="hidden"></td>
        <td></td>
        <td></td>
        <td></td>
        <td><button class="btn btn-danger" (click)="deleteMunicipio(municipio)"> Deleta Munic</button></td>
      </tr>
    </tbody>
  </table>
</div>

```
8. html para criar municipios

```html
<div class="container">

  <h2>Formulário de Entrada de Dados<small>Municípios</small></h2>


  <form name="editForm" novalidate (ngSubmit)="createMunicipio()" #editForm="ngForm">
    <div class="group">
      <input type="text" id="nomeMunicipio" name="nomeMunicipio" [(ngModel)]="municipio.nomeMunicipio" required minlength="3"
        maxlength="50">
      <div [hidden]="!(editForm.controls.nomeMunicipio?.dirty && editForm.controls.nomeMunicipio?.invalid)">
        <small class="form-text text-danger" [hidden]="!editForm.controls.nomeMunicipio?.errors?.required">
          Campo obrigatório.
        </small>
        <small class="ui error message" [hidden]="!(editForm.controls.nomeMunicipio?.dirty && editForm.controls.nomeMunicipio?.invalid)">
          Deve ter entre 3 e 50 caracteres.
        </small>
      </div> <span class="highlight"></span>
      <span class="bar"></span>
      <label for="nomeMunicipio">Nome do Município:</label>
    </div>

    <div class="select">
      <select class="select-text" name="uf" [(ngModel)]="municipio.uf" id="field_uf" required>
        <option [ngValue]="selecione">Selecione</option>
        <option value="MT">MT</option>
        <option value="SP">SP</option>
        <option value="RJ">RJ</option>
        <option value="RS">RS</option>
        <option value="RN">RN</option>
        <option value="GO">GO</option>
        <option value="SC">SC</option>
        <option value="MA">MA</option>
        <option value="TO">TO</option>
        <option value="AM">AM</option>
        <option value="PA">PA</option>
        <option value="PR">PR</option>
        <option value="MG">MG</option>
        <option value="BA">BA</option>
        <option value="SE">SE</option>
        <option value="AL">AL</option>
        <option value="RR">RR</option>
        <option value="RO">RO</option>
        <option value="AC">AC</option>
        <option value="PI">PI</option>
        <option value="PE">PE</option>
        <option value="CE">CE</option>
      </select>
      <div [hidden]="!(editForm.controls.uf?.dirty && editForm.controls.uf?.invalid)">
        <small class="form-text text-danger" [hidden]="!editForm.controls.uf?.errors?.required">
          Selecione uma UF obrigatoriamente.
        </small>
      </div>
      <span class="select-highlight"></span>
      <span class="select-bar"></span>
      <label class="select-label" for="uf">Estado:</label>
    </div>
    <div class="buttons">
      <div [hidden]="editForm.form.invalid ">
        <button type="submit" class="button">Gravar</button>
      </div>
      <div [hidden]="!editForm.form.invalid ">
        <button disabled class="button disabled">Criar Municipio</button>
      </div>
    </div>
  </form>
</div>

```
9. Angular routing

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MunicipioListComponent } from './municipio-v5/municipio-list.component';
import { MunicipioV5Component } from './municipio-v5/municipio-v5.component';

const routes: Routes = [
  { path: 'municipios', component: MunicipioListComponent },
  { path: 'novo', component: MunicipioV5Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```
10. Angular module

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MunicipioV1Component } from './municipio-v1/municipio-v1.component';
import { MunicipioV2Component } from './municipio-v2/municipio-v2.component';
import { MunicipioV3Component } from './municipio-v3/municipio-v3.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MunicipioV4Component } from './municipio-v4/municipio-v4.component';
import { MunicipioV5Component } from './municipio-v5/municipio-v5.component';
import { MunicipioListComponent } from './municipio-v5/municipio-list.component';
import {HttpClientModule} from '@angular/common/http';
import { MunicipioV5Service } from './municipio-v5/municipio-v5.service';



@NgModule({
  declarations: [
    AppComponent,
    MunicipioV1Component,
    MunicipioV2Component,
    MunicipioV3Component,
    MunicipioV4Component,
    MunicipioV5Component,
    MunicipioListComponent,
    HttpClientModule,

  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule, BrowserAnimationsModule, AppRoutingModule
  ],
  providers: [MunicipioV5Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

10. Proxy
```json
{
  "/api/*": {
    "target": "http://localhost:8090/api",
    "secure": false
  }
}
```

11. package.json

```json
"start":"ng serve --proxy-config proxy.config.json",
```

Pronto, nesta  versão fizemos a ligação com uma classe de dados `Municipio`
para quando o formulário for submetido, fosse criada uma instância dessa classe no formato JSON. Na próxima versão [V5](README.V5.md)  vamos criar uma classe de serviços.

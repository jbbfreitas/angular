# Angular Forms V5

Na  versão (V5) vamos fazer a ligação entre os dois lados: o cliente e o servidor.
Para isso vamos utilizar a classe `HttpClient` do angular que realizará chamadas de métodos HTTP no servidor. Essa classe `HttpClient` será utilizada em uma classe de serviços que será criada especialmente para permitir o isolamento de camadas (como fizemos no lado servidor).
Além disso vamos implementar dois casos de uso: "Listar Municipios" e "Criar um novo município". Isso será possível com a criação de um `menu` para que o usuário possa selecionar um dos dois casos de uso de nosso aplicativo: 

Para realizar este tutorial você deverá copiar a pasta `Grupo de Estudo\angular-forms-1-4` para `Grupo de Estudo\angular-forms-5`

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
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MunicipioV5Component } from './municipio-v5/municipio-v5.component';
import { MunicipioListComponent } from './municipio-v5/municipio-list.component';
import {HttpClientModule} from '@angular/common/http';
import { MunicipioV5Service } from './municipio-v5/municipio-v5.service';


@NgModule({
  declarations: [
    AppComponent,
    MunicipioV5Component,
    MunicipioListComponent

  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule
  ],
  providers: [MunicipioV5Service],
  bootstrap: [AppComponent]
})
export class AppModule { }


```

<p align="center">
  <strong>Listagem 1- Arquivo app.module.ts</strong> 
</p>

- 2.2- Criar o arquivo `app-routing.module.ts` para fazer a vinculação entre os componentes e a respectiva  URL. Em aplicações reais deve-se criar um arquivo `routing` para cada caso de uso. 
  


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

> Observe na Listagem 2 que primeiramente é feita a declaração de uma constante denominada aqui de `routes`. Essa constante é um `array` contendo os dois links que usaremos. Em (3) a diretiva `exports` publica  as duas rotas que, então, poderão ser utilizadas na nossa aplicação.

- 2.3- Finalmente, será necessário configurar a `view` para exibir o nosso `menu`. 
  

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

Na pasta `Grupo de Estudo\angular-forms-5` abra um prompt e digite:

```
ng generate component municipioV5
```

e em seguida:

```
ng g component municipio-v5/municipio-list --flat
```
4. Altere os arquivos `municipio-v5.component.ts` e  `municipio-list.component.ts` conforme Listagem 4 e Listagem 5 respectivamente.

```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMunicipio, Municipio, Estado } from '../shared/model/municipio.model';
import { MunicipioV5Service } from './municipio-v5.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-municipio-v5',
  templateUrl: './municipio-v5.component.html',
  styleUrls: ['./municipio-v5.component.css']
})
export class MunicipioV5Component implements OnInit {
 municipio: IMunicipio = new Municipio();

  constructor(private router: Router, private municipioService: MunicipioV5Service) {
  }

  ngOnInit() {
  }

  save(): void {
       this.municipioService.createMunicipio(this.municipio)
      .subscribe( data => {
        alert('Municipio criado com sucesso.');
      });
  }
}

```
<p align="center">
    <strong>Listagem 4- Arquivo municipio-v5.component.ts</strong> 
</p>

```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMunicipio, Municipio } from '../shared/model/municipio.model';
import { MunicipioV5Service } from './municipio-v5.service';

@Component({
  selector: 'app-municipio-list',
  templateUrl: './municipio-list.component.html',
  styleUrls: ['./municipio-v5.component.css']
})
export class MunicipioListComponent implements OnInit {
  municipios: IMunicipio[];

  constructor(private router: Router, private municipioService: MunicipioV5Service) {

  }
  ngOnInit() {
    this.municipioService.getMunicipios()
      .subscribe( data => {
        this.municipios = data;
        console.log(this.municipios);
      });
  }
}

```
<p align="center">
    <strong>Listagem 5- Arquivo municipio-v5.component.ts</strong> 
</p>

::: :pushpin: Importante :::

> Observe o trecho de código abaixo extraído da Listagem 4

```typescript
...
1 municipio: IMunicipio = new Municipio();

2  constructor(private router: Router, private municipioService: MunicipioV5Service) {
  }
...
3  save(): void {
       this.municipioService.createMunicipio(this.municipio).subscribe( data => {
        alert('Municipio criado com sucesso.');
      });
  }
```
> Em (1) a variável `municipio` é declarada e instanciada.
> Em (2) está o método construtor da classe `MunicipioV5Component`. Em Angular, um declaração desse tipo equivale a declarar uma variável de instância e em seguida atribuir os valores das instâncias passados como parâmetro para essas vairáveis.
> Em (3) o método `save()`utiliza `municipioService` para criar um município. É interessante notar que esse método utiliza `subscribe` que significa que esse método se inscreve para obter uma resposta assíncrona do servidor, atribuindo essa resposta à variável `data`. Os estudantes mais atentos perceberão que está sendo impplementado aqui o `pattern` `observer`.


5. Criar um componente de serviços

O Angular-CLI permite que sejam criados componentes de serviços. Para isso, na pasta `Grupo de Estudo\angular-forms-5` abra um prompt e digite:

```
ng g service  municipio-v5/municipio-v5 --flat
```

6. Editar MunicipioService para o conteúdo da Listagem 6

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
    return this.http.post<IMunicipio>(this.municipioUrl , municipio, httpOptions);
  }
  getMunicipios(): any {
    return this.http.get<IMunicipio[]>(this.municipioUrl, httpOptions);
  }

}

```
<p align="center">
    <strong>Listagem 6- Arquivo municipio-v5.service.ts</strong> 
</p>

::: :pushpin: Importante :::

> Observe o trecho de código abaixo extraído da Listagem 4

```typescript
...
1 const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


2 @Injectable({
  providedIn: 'root'
})
export class MunicipioV5Service {
3  constructor(private http: HttpClient) {}

4  private municipioUrl = '/api/municipios';


5  createMunicipio(municipio: IMunicipio): any {
    return this.http.post<IMunicipio>(this.municipioUrl , municipio, httpOptions);
  }
6  getMunicipios(): any {
    return this.http.get<IMunicipio[]>(this.municipioUrl, httpOptions);
  }

}
```
> Em (1) é declarada uma constante `httpOptions`. Essa constante será utilizada como cabeçalho do protocolo HTTP, nos métodos (5) e (6), informando que o conteúdo é do tipo JSON.

> A anotação `@Injectable` usada em (2) indica que essa classe de serviços será  injetada pelo Angular sempre que usada em um método construtor, conforme exemplificado na Listagem5. O parâmetro `providedIn` informa em qual `module` esse serviço foi declarado como `provide`. Veja que no nosso caso ele foi declarado em `app.module.ts` (Listagem 1). 

> O construtor dessa classe de serviços está declarado em (3). Esse construtor recebe, por meio de injeção de dependência, uma instância de `HttpClient`. Essa instância é associada à variável `http` para ser utilizada posteriormente em (5) e (6). Se tiver dúvidas quanto a esse comportamento do Angular, releia a explicação dada na Listagem 5. 

> Os métodos HTTP recebem como um de seus parâmetros a URL onde será executado o respectivo método no lado servidor (no nosso caso os métodos REST escritos em Java). O estudante mais atento verá que a classe `MunicipioResource.java` tem a anotação `@RequestMapping("/api")` e que os seus métodos são anotados com `Mapping("/municipios")`. Isso significa que a URL para os métodos dessa classe é `http:localhost:8090/api/municipios`. É por essa razão que em (4) está sendo declarada uma variável `municipioUrl`.

> Em (5) e (6) estão descritos os dois métodos dessa classe de serviço: `createMunicipio` e `getMunicipios`. Esses métodos usam, respectivamente, os métodos `HTTP.POST` e `HTTP.GET`. 



7. Edite a view para exibir a  lista de municipios, conforme Listagem

```html
<div class="container">
  <h2>Lista de Municipios</h2>

  <table class="rtable">
    <thead>
      <tr>
        <th class="hidden">Id</th>
        <th>Nome</th>
        <th>UF</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let municipio of municipios">
        <td> {{municipio.id}}</td>
        <td>{{municipio.nomeMunicipio}}</td>
        <td>{{municipio.uf}}</td>
      </tr>
    </tbody>
  </table>
</div>

```
<p align="center">
    <strong>Listagem 7- Arquivo municipio-list.component.html</strong> 
</p>

8. html para criar municipios

```html
<div class="container">
  <h2>Formulário de Entrada de Dados<small>Municípios</small></h2>
  <form name="editForm" novalidate (ngSubmit)="save()" #editForm="ngForm">
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
        <button disabled class="button disabled">Gravar</button>
      </div>
    </div>
  </form>
</div>

```
<p align="center">
    <strong>Listagem 8- Arquivo municipio-V5.component.html</strong> 
</p>


9. Ajustar o Proxy do Node.js

Você se lembra da linha de código abaixo?

```typescript
private municipioUrl = '/api/municipios';
```
Pois é, dissemos que ela seria usada como parte da URL de `http:localhost:8090/api/municipios` para executar métodos da classe `MunicipioResource.java`. Mas como é possível se o Node.js está sendo executado em `http://localhost:4200`?
A resposta é: isso é possível se ajustarmos o `proxy`. Isso mesmo, temos que ajustar o proxy do Node.js para que ele faça a conversão de `http://localhost:4200` para `http:localhost:8090`. Isso é feito criando-se um arquivo `proxy.conf.json` na pasta `src` do projeto com o conteúdo da Listagem 9.

```json
{
  "/api/*": {
    "target": "http://localhost:8090",
    "secure": false,
    "pathRewrite": {"^/api" : "/api"},
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```
<p align="center">
    <strong>Listagem 9- Arquivo proxy.conf.json</strong> 
</p>


10. Altere o arquivo `package.json` para reconhecer o proxy.

```json
{
  ...
  "scripts": {
    "ng": "ng",
    "start": "ng serve --proxy-config proxy.conf.json",
  ...
  },
  ```

11. Inicie o servidor usando a linha de comando abaixo:

```
npm start
```

Pronto, nesta  versão (V5) fizemos a ligação entre os dois lados: o cliente e o servidor.
Utilizar a classe `HttpClient` do angular para as chamadas de métodos HTTP no servidor. Foi criada também uma classe de serviços para isolar a responsabilidade das camadas.

Implementamos dois casos de uso: "Listar Municipios" e "Criar um novo município". Isso foi possível graças ao uso de `Routing`. Na próxima versão [V6](../angular-forms-6/README.md)  vamos criar um novo calso de uso: "Excluir Municipios".

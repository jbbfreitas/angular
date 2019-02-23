# Angular Forms V1

Os dois objetos fundamentais em formulários no Angular são `FormControl` e `FormGroup`.

## FormControl
Um `FormControl` representa um único campo de entrada - é a menor unidade de um formulário no Angular. O componente FormControl encapsula o valor do campo e declara que ele é válido, sujo (alterado) ou se contém
erros.


## FormGroup

A maioria dos formulários tem mais de um campo, então precisamos de uma maneira de gerenciar múltiplos `FormControls`. 
Os `FormsGroups` são úteis por agrupar um conjunto de `FormControls`. Por exemplo, se quiséssemos verificar a validade do nosso formulário, teríamo que fazer uma iteração em uma `array` de `FormControls` e verificar se foram violadas as regras de interface em cada um deles . Os `FormGroups` entram em cena exatamente para resolver esse tipo de problema pois representam uma coleção de `FormControls`.

### Criando uma aplicação com um primeiro formulário

::: :walking: Passo a passo :::  

1. Na pasta `Grupo de Estudo\Angular` abra um `prompt`e digite

```java
ng new angular-forms
```
Após criada a aplicação faça:

```java
 cd angular-forms
 ng generate component municipioV1 
```
> `ng` é um prefixo que significa `Angular` e está invocando o Anglular-Cli para gerar um novo componente. Vide Figura 1.

<p align="center">
  <img src="imagens/ComponentesGeradosV1.png" alt="Arquivos após gerar municipioV1">
</p>
<p align="center">
   <strong>Figura 1- Arquivos após gerar municipioV1</strong> 
</p>

2. Alterar o módulo da aplicação

### O que são os NgModule

::: :pushpin: Importante :::

> Uma aplicação Angular é por natureza dividida em módulos. Os módulos são descritos (descrever nesse caso é informar qual o seu conteúdo, o que o módulo está importando e o que está exportando) através da utilização do NgModule. 
Um NgModule é, na verdade uma anotação `decorator` que marca uma determinada classe com a anotação @NgModule. @NgModule  descreve, então, como compilar um componente e como injetar um determinado serviço em tempo de execução. A anotação transforma a classe em um NgModule e, assim, identifica os componentes, diretivas e filtros do próprio módulo, tornando alguns deles públicos, por meio da propriedade `exports`, para que componentes externos possam usá-los. O @NgModule também pode adicionar provedores de serviços para que o Angular faça a injeção de dependência nos componentes apropriados.


> A medida que os projetos vão se tornando mais complexos pode ser necessário criar outras classes NgModule. Isso significa dizer que um projeto poderá conter um conjunto  de `ngModule` que podem importar o que é exportados por outros módulos.

> Tudo o que é adicionado em um `ngModule` fica disponível para os componentes(na view, model e controller) daquele módulo.

**a** Após compreender para que servem os módulos, vamos alterar a classe `AppModule` para que ela possa trabalhar com formulários. Altere o arquivo `app.module.ts` para o conteúdo da Listagem 1.


```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // >>> Aterado manualmente aqui
import { MunicipioV1Component } from './municipio-v1/municipio-v1.component';

@NgModule({
  declarations: [
    AppComponent,
    MunicipioV1Component  // >>> Alterado pelo Angular-CLI
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule // >>> Alterado manualmente aqui
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
 
<p align="center">
   <strong>Listagem 1- Classe AppModule no arquivo app.module.ts</strong> 
</p>

**b** Em seguida vamos alterar o componente  `MunicipioV1Component` criando o método `onSubmit` 

```typescript
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
//Método criado para mostrar na console o que acontece quando se clica em um botão.
  onSubmit(form: any): void {
    console.log('Você submeteu o formulário:', form);
    console.log ('O nome do municipio é', form.nomeMunicipio);
  }

}

```
<p align="center">
   <strong>Listagem 2- Classe MunicipioV1Component no arquivo municipio-v1.component.ts</strong> 
</p>

**c** Por fim vamos alterar a camada view da nossa aplicação que está no arquivo `municipio-v1.component.html` para exibir o nosso formulário. 

```html
<div class="ui raised segment">
  <h2 class="ui header">Cadastro de Município</h2>
  <form #f="ngForm" (ngSubmit)="onSubmit(f.value)" class="ui form">
    <div class="field">
      <label for="nomeMunicipio">Nome do Município:</label>
      <input type="text" id="nomeMunicipio" placeholder="Nome do Municipio" name="nomeMunicipio" ngModel>
    </div>
    <div class="field">
      <label for="uf">Estado:</label>
      <input type="text" id="uf" placeholder="UF" name="uf" ngModel>
    </div>
    <hr>
    <button type="submit" class="ui button">Gravar</button>
  </form>
</div>

```

<p align="center">
   <strong>Listagem 3- Camada View da aplicação: arquivo municipio-v1.component.html</strong> 
</p>

**c** Alterar o bootstrap para exibir o componente municipioV1.

Reproduzi parte da Listagem 1 no trecho de código abaixo, enfatizando o `bootstrap`

```typescript
@NgModule({
  declarations: [
    AppComponent,
    MunicipioV1Component  
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent] //<<<BootStrap
})
```

O `NgModule` também define qual é o componente `bootstrap`, ou seja, qual o componente que inicia todo o processo. No exemplo acima o `bootstrap` é o `ApComponent` que está módulo `app`. Isso significa que a primeira página a ser carregada é a `app.component.html`.

Substitua as instruções da página por `<app-municipio-v1></app-municipio-v1>`. Se você abrir o arquivo `municipio-v1.component.ts` (Listagem 4) verá que o seletor   desse componente é exatamente `<app-municipio-v1></app-municipio-v1>`.

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-municipio-v1', //<<<< seletor 
  templateUrl: './municipio-v1.component.html',
  styleUrls: ['./municipio-v1.component.css']
})
export class MunicipioV1Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: any): void {
    console.log('Você submeteu o formulário:', form);
    console.log ('O nome do municipio é', form.nomeMunicipio);
  }

}

```
<p align="center">
   <strong>Listagem 4- Arquivo municipio-v1.component.ts</strong> 
</p>

#### Desafio 1 :innocent:
 
 
- Exexcute o comando `ng serve` e digite  no seu browser  a url `localhost:4200`. 
Abra a console do navegador, usando as instruções abaixo e clique no botão `Gravar`.

**a** Usando o Chrome ou Firefox

> Pressione Ctrl + Shift + J (Windows/Linux) ou Cmd + Opt + J (Mac).
Se o DevTools já estiver aberto, pressione o botão Console.

::: :pushpin: Importante :::
> Para alterar a porta e o host padrão, há duas alternativas:

- `ng serve --host 0.0.0.0 --port 5000`

ou

- Alterar o arquivo `angular.json`
```json
"projects": {
    "project-name": {
        ...
        "architect": {
            "serve": {
                "options": {
                  "host": "0.0.0.0",
                  "port": 5000
                }
            }
        }
        ...
    }
}
```

#### Desafio 2 :innocent:
 

- Explique o porquê da exibição da página `municipio-v1.component.html` quando se executa a instrução do desafio 1.


A primeira versão do formulário está pronta. Siga agora para a [implementação da versão V2](README.V2.md) .
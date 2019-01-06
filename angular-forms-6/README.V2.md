# Angular Forms V2

Nesta versão vamos implementar validadores nos campos do formulário.

### Criando uma aplicação com um segundo formulário

::: :walking: Passo a passo :::  

1. Na pasta `Grupo de Estudo\Angular` abra um `prompt`e digite


```java
 cd angular-forms
 ng generate component municipioV2 
```

> Observe que após a execução da instrução acima, foram criados novos arquivos pelo Angular-Cli, vide Figura 1.

<p align="center">
  <img src="imagens/ComponentesGeradosV2.png" alt="Arquivos após gerar municipioV2">
</p>
<p align="center">
   <strong>Figura 1- Arquivos após gerar municipioV2</strong> 
</p>

2. Alterar o componente  `MunicipioV2Component`, conforme Listagem 1.

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-municipio-v2',
  templateUrl: './municipio-v2.component.html',
  styleUrls: ['./municipio-v2.component.css']
})
export class MunicipioV2Component implements OnInit {
  nomeMunicipio: string ;//<<< criada a variável de instância nomeMunicipio
  uf: string; //<<< criada a variável de instância uf
  constructor() { }

  ngOnInit() {
  }
 //Criado o método salvar
  save(): void {
    console.log ('O nome do municipio é', this.nomeMunicipio); //<<< usando this.
    console.log ('O estado é', this.uf); //<<< usando this.

  }
}
}
````

<p align="center">
   <strong>Listagem 1- Componente MunicipioV2Component</strong> 
</p>

2. Alterar o arquivo  `app.component.html`.

O `NgModule` também define qual é o componente `bootstrap`, ou seja, qual o componente que inicia todo o processo. No exemplo acima o `bootstrap` é o `ApComponent` que está módulo `app`. Isso significa que a primeira página a ser carregada é a `app.component.html`.

Substitua as instruções da página por `<app-municipio-v2></app-municipio-v2>`. 


3. Alterar o arquivo  `municipio-v2.component.html`, conforme Listagem 2.

```html
<div class="row justify-content-center">
    <h2 class="ui header">Cadastro de Município V2</h2>
  <div class="col-8">
    <form name="editForm" novalidate (ngSubmit)="save()" class="ui form" #editForm="ngForm">
      <div class="form-group">
        <label class="form-control-label" for="nomeMunicipio">Nome do Município:</label>
        <input class="form-control" type="text" id="nomeMunicipio" placeholder="Nome do Municipio" name="nomeMunicipio"
          [(ngModel)]="nomeMunicipio" required minlength="3" maxlength="50">
        <div [hidden]="!(editForm.controls.nomeMunicipio?.dirty && editForm.controls.nomeMunicipio?.invalid)">
          <small class="form-text text-danger" [hidden]="!editForm.controls.nomeMunicipio?.errors?.required">
            O nome do município é obrigatório.
          </small>
          <small class="ui error message" [hidden]="!(editForm.controls.nomeMunicipio?.dirty && editForm.controls.nomeMunicipio?.invalid)">
            Nome do município deve ter entre 3 e 50 caracteres.
          </small>
        </div>
      </div>
      <div class="form-group">
        <label class="form-control-label" for="uf">Estado:</label>
        <input class="form-control" type="text" id="uf" placeholder="UF" name="uf" [(ngModel)]="uf" required>
        <div [hidden]="!(editForm.controls.uf?.dirty && editForm.controls.uf?.invalid)">
          <small class="form-text text-danger" [hidden]="!editForm.controls.uf?.errors?.required">
            UF é obrigatória.
          </small>
        </div>
      </div>
      <div>
        <button type="submit" class="ui button">Gravar</button>
      </div>
    </form>
  </div>
</div>

```
<p align="center">
   <strong>Listagem 2- Camada View da aplicação: arquivo municipio-v2.component.html</strong> 
</p>

::: :pushpin: Importante :::

> Vamos comentar as instruções mais importantes dessa listagem

```
    <form name="editForm" novalidate (ngSubmit)="save()" class="ui form" #editForm="ngForm">

```

> Quando se importa `FormsModule` a tag `form` é automaticamente ligada às diretivas `ngForm`, `ngModel`, `ngSubmit` dentre outas. 

#### ngForm
> A diretiva `ngForm` cria uma instância de `FormGroup` e a vincula a um formulário para rastrear os valores dos `FormControls` agrupados. Permite acesso também ao status de validação, tal como `dirty`, `valid`, `touched`, `value` etc.

#### #editForm="ngForm"
> Opcionalmente a diretiva pode ser associada a uma variável de modelo local usando a chave `#` (ex: #myForm = "ngForm"). Apesar de opcional essa técnica é bastante útil pois muitas propriedades da instância do `FormGroup`  podem ser usadas como propriedades de interação do usuário, como `editForm.controls.uf?.dirty`.

#### (ngSubmit)="save()"
> `(ngSubmit)` é uma diretiva de `output`, ou seja, faz  a ligação **saindo** da `view` para um método do `controller`. No caso em estudo está vinculando o  `submit` do formulário ao método `save()` do componente. 

#### novalidate

```html
<input class="form-control" type="text" id="nomeMunicipio" placeholder="Nome do Municipio" 
        name="nomeMunicipio" [(ngModel)]="nomeMunicipio" required minlength="3" maxlength="50">
```
#### [(ngModel)]="nomeMunicipio"
> `[(ngModel)]` é uma diretiva bidirecional (os sinais `([])` é que dão essa característica à diretiva), ou seja, funciona tanto para `output` como para `input`. Essa diretiva
vincula os valores de um `FormControl` a uma variável declarada no componente e vice-versa. No caso em tela a instrução `[(ngModel)]="nomeMunicipio"` está vinculando o valor do campo à uma vairável declarada em `municipio-v2.component.ts` de nome `nomeMunicipio`. Da mesma forma, se for alterado programaticamente o valor da variável `nomeMunicipio`, essa alteração será refletida no valor da tag `input` e será exibida no formulário.

#### required 
> O atributo `required`  informa que o prenchimento do campo é obrigatório. Essa é a nossa primeira regra de validação do formulário. O não preenchimento do campo colocará o `FormControl` em um estado de erro `required`, conforme será visto mais adiante.

#### minlength="3" 
> O atributo `minlength="3"`  informa que o prenchimento do campo deve ter pelo menos 3 caracteres. Essa é a nossa segunda regra de validação do formulário. O não atendimento dessa regra colocará o `FormControl`  em um estado `dirty` ou `invalid`, conforme será visto mais adiante.

#### maxlength="50"
> O atributo `maxlength="50"`  informa que o prenchimento do campo deve ter no máximo 50 caracteres. Essa é a nossa terceira regra de validação do formulário. O não atendimento dessa regra colocará o `FormControl` em um estado  em um estado `dirty` ou `invalid`, conforme será visto mais adiante.


```html
<div [hidden]="!(editForm.controls.uf?.dirty && editForm.controls.uf?.invalid)">
          <small class="form-text text-danger" [hidden]="!editForm.controls.uf?.errors?.required">
            UF é obrigatória.
          </small>
</div>
```
#### [hidden]
> A diretiva `[hidden]` é somente de `input` e como o próprio nome já diz, irá ocultar o conteúdo de toda a tag onde ela foi declarada. No trecho de código acima  se o estado do campo `uf` for `dirty` ou `invalid` toda a tag `<div><\div>` ficará oculta e se o estado do campo `uf` for de erro por ser `required` a tag `<small></small>` também ficará oculta. Quando qualquer uma das duas estiver oculta, a mensagem `UF é obrigatória` não será exibida.

#### dirty e invalid
> Esses dois estados tem caracteristicas similares: ambos são atribuidos a um `FormControl` sempre que uma regra de validação for violada. Entretanto, a diferença entre ambos está no fato de que `dirty` é associado a um estado de um `FormControl` quando este já foi preenchido pelo menos uma vez naquela seção, enquanto que `invalid` não leva em conta se o controle já foi ou não preenchido naquela seção.

#### required
> `required` é associado a um estado de um `FormControl` quando um determinado controle for de preenchimento obrigatório e encontra-se não preenchido.

#### Desafio 1 :innocent:
 
 
- Exexcute o comando `ng serve` e digite no seu browser a url  `localhost:4200`. 
Abra a console do navegador, usando as instruções abaixo e clique no botão `Salvar`.


**a** Usando o Chrome ou Firefox

> Pressione Ctrl + Shift + J (Windows/Linux) ou Cmd + Opt + J (Mac).
Se o DevTools já estiver aberto, pressione o botão Console.


#### Desafio 2 :innocent:
 
```typescript
save(): void {
    console.log ('O nome do municipio é', this.nomeMunicipio); //<<< usando this.
    console.log ('O estado é', this.uf); //<<< usando this.
  }
```

- Observando o trecho de código acima, explique:  o que siginifica `this`? Qual a diferença dessa instrução para a da versão V1?


Pronto, o nosso formulário agora possui regras de validação. Na versão [V3](README.V3.md) iremos mostrar o uso de componentes do tipo `select` em formulários.

# Angular Forms V3

Nesta versão vamos mostrar como utilizar `select` em Angular.

### Criando uma aplicação com um segundo formulário

::: :walking: Passo a passo :::  

1. Na pasta `Grupo de Estudo\Angular` abra um `prompt`e digite


```java
 cd angular-forms
 ng generate component municipioV3 
```


2. Alterar o componente  `MunicipioV3Component`, conforme Listagem 1.

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-municipio-v3',
  templateUrl: './municipio-v3.component.html',
  styleUrls: ['./municipio-v3.component.css']
})
export class MunicipioV3Component implements OnInit {
  nomeMunicipio: string ;
  uf: string;
  constructor() { }

  ngOnInit() {
  }

  save(): void {
    console.log ('O nome do municipio é', this.nomeMunicipio);
    console.log ('O estado é', this.uf);

  }
}

````

<p align="center">
   <strong>Listagem 1- Componente MunicipioV3Component</strong> 
</p>

2. Alterar o arquivo  `app.component.html`.

O `NgModule` também define qual é o componente `bootstrap`, ou seja, qual o componente que inicia todo o processo. No exemplo acima o `bootstrap` é o `ApComponent` que está módulo `app`. Isso significa que a primeira página a ser carregada é a `app.component.html`.

Substitua as instruções da página por `<app-municipio-v3></app-municipio-v3>`. 

3. Alterar o arquivo  `municipio-v3.component.html`, conforme Listagem 1.

```html
<div class="row justify-content-center">
  <h2 class="ui header">Cadastro de Município V3</h2>
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
        <select class="form-control" name="uf" [(ngModel)]="uf" id="field_uf" style="min-width:20%;" required>
          <option [ngValue]="Selecione">Selecione</option>
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
      </div>
      <div>
        <button type="submit" [disabled]="editForm.form.invalid " class="ui button">Gravar</button>
      </div>
    </form>
  </div>
</div>


```
<p align="center">
   <strong>Listagem 1- Camada View da aplicação: arquivo municipio-v3.component.html</strong> 
</p>



#### Desafio 1 :innocent: 
 
- Exexcute o comando `ng serve` e digite no seu browser a url  `localhost:4200`. 

> Em que condições o botão `Salvar` fica desabilitado? Que instrução provoca esse  comportamento?


Pronto, o nosso formulário agora possui um `select` com valores pré-definidos. Na última versão [V4](README.V4.md)  melhorar a aparência do nosso foumulários bem como fazer a ligação com uma classe de dados Municipio..

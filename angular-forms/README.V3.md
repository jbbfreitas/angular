# Angular Forms V3

Nesta versão vamos mostrar como utilizar `select` em Angular.
Vamos também melhora a aparência do nosso aplicativo dando um "banho de CSS".
Utilizaremos a bibloteca "Material" da Google.

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
<div class="container">

  <h2>Formulário de Entrada de Dados<small>Municípios</small></h2>


  <form name="editForm" novalidate (ngSubmit)="save()" #editForm="ngForm">
    <div class="group">
      <input type="text" id="nomeMunicipio" name="nomeMunicipio" [(ngModel)]="nomeMunicipio" required minlength="3"
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
      <select class="select-text" name="uf" [(ngModel)]="uf" id="field_uf" required>
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
   <strong>Listagem 1- Camada View da aplicação: arquivo municipio-v3.component.html</strong> 
</p>

```css
* { box-sizing:border-box; }

/* basic stylings ------------------------------------------ */
body 				 { background:url(https://scotch.io/wp-content/uploads/2014/07/61.jpg); }
.container 		{ 
  font-family:'Roboto';
  width:600px; 
  margin:30px auto 0; 
  display:block; 
  background:#FFF;
  padding:10px 50px 50px;
}
h2 		 { 
  text-align:center; 
  margin-bottom:50px; 
}
h2 small { 
  font-weight:normal; 
  color:#888; 
  display:block; 
}
.footer 	{ text-align:center; }
.footer a  { color:#53B2C8; }

/* form starting stylings ------------------------------- */
.group 			  { 
  position:relative; 
  margin-bottom:45px; 
}
input 				{
  font-size:18px;
  padding:10px 10px 10px 5px;
  display:block;
  width:300px;
  border:none;
  border-bottom:1px solid #757575;
}
input:focus 		{ outline:none; }

/* LABEL ======================================= */
label 				 {
  color:#999; 
  font-size:18px;
  font-weight:normal;
  position:absolute;
  pointer-events:none;
  left:5px;
  top:10px;
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}

/* active state */
input:focus ~ label, input:valid ~ label 		{
  top:-20px;
  font-size:14px;
  color:#5264AE;
}

/* BOTTOM BARS ================================= */
.bar 	{ position:relative; display:block; width:300px; }
.bar:before, .bar:after 	{
  content:'';
  height:2px; 
  width:0;
  bottom:1px; 
  position:absolute;
  background:#5264AE; 
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}
.bar:before {
  left:50%;
}
.bar:after {
  right:50%; 
}

/* active state */
input:focus ~ .bar:before, input:focus ~ .bar:after {
  width:50%;
}

/* HIGHLIGHTER ================================== */
.highlight {
  position:absolute;
  height:60%; 
  width:100px; 
  top:25%; 
  left:0;
  pointer-events:none;
  opacity:0.5;
}

/* active state */
input:focus ~ .highlight {
  -webkit-animation:inputHighlighter 0.3s ease;
  -moz-animation:inputHighlighter 0.3s ease;
  animation:inputHighlighter 0.3s ease;
}

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
@-moz-keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
@keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
/* select starting stylings ------------------------------*/
.select {
  font-family:
    'Roboto','Helvetica','Arial',sans-serif;
	position: relative;
	width: 350px;
}

.select-text {
	position: relative;
	font-family: inherit;
	background-color: transparent;
	width: 350px;
	padding: 10px 10px 10px 0;
	font-size: 18px;
	border-radius: 0;
	border: none;
	border-bottom: 1px solid rgba(0,0,0, 0.12);
}

/* Remove focus */
.select-text:focus {
	outline: none;
	border-bottom: 1px solid rgba(0,0,0, 0);
}

	/* Use custom arrow */
.select .select-text {
	appearance: none;
	-webkit-appearance:none
}

.select:after {
	position: absolute;
	top: 18px;
	right: 10px;
	/* Styling the down arrow */
	width: 0;
	height: 0;
	padding: 0;
	content: '';
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	border-top: 6px solid rgba(0, 0, 0, 0.12);
	pointer-events: none;
}


/* LABEL ======================================= */
.select-label {
	color: rgba(0,0,0, 0.26);
	font-size: 18px;
	font-weight: normal;
	position: absolute;
	pointer-events: none;
	left: 0;
	top: 10px;
	transition: 0.2s ease all;
}

/* active state */
.select-text:focus ~ .select-label, .select-text:valid ~ .select-label {
	color: #2F80ED;
	top: -20px;
	transition: 0.2s ease all;
	font-size: 14px;
}

/* BOTTOM BARS ================================= */
.select-bar {
	position: relative;
	display: block;
	width: 350px;
}

.select-bar:before, .select-bar:after {
	content: '';
	height: 2px;
	width: 0;
	bottom: 1px;
	position: absolute;
	background: #2F80ED;
	transition: 0.2s ease all;
}

.select-bar:before {
	left: 50%;
}

.select-bar:after {
	right: 50%;
}

/* active state */
.select-text:focus ~ .select-bar:before, .select-text:focus ~ .select-bar:after {
	width: 50%;
}

/* HIGHLIGHTER ================================== */
.select-highlight {
	position: absolute;
	height: 60%;
	width: 100px;
	top: 25%;
	left: 0;
	pointer-events: none;
	opacity: 0.5;
}
.button.disabled {
  opacity: 0.65; 
  cursor: not-allowed;
}

/* button code for illustration only */ 

body {
  background: #000; 
}

.buttons {
  display: block;
  width: 150px;
  margin: 0 auto;
  margin-top: 20px;
}

.button, .button.disabled:hover { 
    display: block;
    margin-bottom: 20px;
    text-decoration: none;
    border:1px solid #25729a; 
    -webkit-border-radius: 3px; 
    -moz-border-radius: 3px;
    border-radius: 3px;
    font-family:arial, helvetica, sans-serif; 
    padding: 10px 10px 10px 10px; 
    text-shadow: -1px -1px 0 rgba(0,0,0,0.3);
    text-align: center; 
    color: #FFFFFF; 
    background-color: #3093c7;
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #3093c7), color-stop(100%, #1c5a85));
    background-image: -webkit-linear-gradient(top, #3093c7, #1c5a85);
    background-image: -moz-linear-gradient(top, #3093c7, #1c5a85);
    background-image: -ms-linear-gradient(top, #3093c7, #1c5a85);
    background-image: -o-linear-gradient(top, #3093c7, #1c5a85);
    background-image: linear-gradient(to top, #3093c7, #1c5a85);filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#3093c7, endColorstr=#1c5a85);
}

.button:hover{
    border:1px solid #1c5675;
    background-color: #26759e;
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#26759e), color-stop(100%, #133d5b));
    background-image: -webkit-linear-gradient(top, #26759e, #133d5b);
    background-image: -moz-linear-gradient(top, #26759e, #133d5b);
    background-image: -ms-linear-gradient(top, #26759e, #133d5b);
    background-image: -o-linear-gradient(top, #26759e, #133d5b);
    background-image: linear-gradient(to top, #26759e, #133d5b);filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#26759e, endColorstr=#133d5b);
}
```

#### Desafio 1 :innocent: 
 
- Exexcute o comando `ng serve` e digite no seu browser a url  `localhost:4200`. 

> Em que condições o botão `Salvar` fica desabilitado? Que instrução provoca esse  comportamento?


Pronto, o nosso formulário agora possui um `select` com valores pré-definidos. Na última versão [V4](README.V4.md)  melhorar a aparência do nosso foumulários bem como fazer a ligação com uma classe de dados Municipio..

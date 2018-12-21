# Angular Hello World 

###  Construindo uma primeira aplicação web usando o Angular

Neste aplicativo simples, abordaremos a maioria dos aspectos essenciais do Angular, incluindo:
- Construção de componentes personalizados;
- Formulários com entrada de dados do usuário;
- Renderização de listas de objetos em views;
- Interceptação de cliques do usuário para atuar sobre eles; e 
- Disponibilizar nosso aplicativo em um servidor

#### 1. Construção de componentes personalizados 

::: :mortar_board Novo conceito :::

Primeiramente vamos definir o que vem a ser um componente para o Angular

Uma das grandes ideias por trás do Angular é a possibilidade de se criar novoc componentes.
Em nossos aplicativos Angular, escrevemos a marcação HTML que se torna nosso aplicativo interativo, mas o navegador só entende um conjunto limitado de tags de marcação; Built-ins como <select> ou <form> ou <video> têm funcionalidade definida pelo nosso criador do navegador.
E se quisermos ensinar as novas tags do navegador? E se quiséssemos ter uma tag <weather> que mostrasse o clima? Ou se quisermos criar uma tag <login> que mostre um painel de login?
Esta é a ideia fundamental por trás dos componentes: ensinaremos ao navegador novas tags que possuem funcionalidades customizadas associadas a elas.

::: :walking: Passo a passo :::

**a.** Instale o Node.js para o seu SO : Mac, Linux ou Windows clicando no link https://nodejs.org/en/download/

O Node.js é um runtime assíncrono e baseado em eventos para a linguagem JavaScript. Foi projetado para criar aplicativos de rede escalonáveis. É uma marca registrada da Joyent, Inc.

Nós iremos usar o Node.js como servidor para executar o nosso exemplo.
Você poderá instalar o Node, através desta página https://nodejs.org/en/download/

No momento da escrita deste material a última versão estável era: 10.14.1 (incluindo o npm 6.4.1)

**b**. Instale o TypeScript usando o seguinte no seu prompt:

```
npm install -g typescript
```

A linguagem TypeScript foi criada pela Microsoft, e tem sido uma escolha comum entre os desenvolvedores ASP.NET. Não se trata de uma linguagem completamente nova, mas sim superconjunto do JavaScript, leia este artigo interessantíssimo sobre a evolução do JavaScript https://www.excella.com/insights/typescript-vs-es6-vs-es2015 , vale a pena!

Na realidade não é obrigatório usar a linguagem typescript para usar o Angular. O Angular tem uma API do ES5, mas o Angular é escrito em TypeScript e geralmente é o que todos estão usando. Vamos usar o TypeScript  porque é uma ótima linguagem e facilita o trabalho com o Angular. 
Fique livre para ler um pouco mais sobre usar o Angular com o Java Script (ES5), veja esse blog https://blog.thoughtram.io/angular/2015/05/09/writing-angular-2-code-in-es5.html que explica como é possível usar o Angular com o JavaScript ES5.

**c**. Instale o Angular CLI

```
npm install -g @angular/cli@7.0.6
```
<p align="center">
  <img src="imagens/AnglularCli.png" alt="Imagem do Angula CLI">
</p>
<p align="center">
   <strong>Figura 1- Imagem do Angular CLI mostrando as versões instaladas</strong> 
</p>

O Angular CLI é um utilitário que permitir aos usuários criar e gerenciar projetos, usando o `prompt`. 

Ele automatiza tarefas como, por exemplo, a criação de projetos completos usando o Angular ou, simplesmete, a adição de novos `controllers` em projetos já existentes. 

Você vai observar que o Angular usa muitos arquivos que devem estar oreganizados, adequadamente, em pastas. Por isso é sempre uma boa prática usar o Angular CLI, para que os seus projetos mantenham sempre os mesmos padrões.

**d.** Verifique a versão que foi instalada, digitanto `ng --version`


**e.** Na pasta `Angular`, digite o seguinte comando no prompt: 

```
ng new primo
```
Veja na Figura 2 o que foi criado pelo Angular CLI

<p align="center">
  <img src="imagens/EstruturaDePastas.png" alt="Estrutura de pastas criada peloi Angula CLI">
</p>
<p align="center">
   <strong>Figura 2- Estrutura de pastas criada peloi Angula CLI para o projeto ola-mundo</strong> 
</p>

#### 2. Executando a aplicação ola-mundo 

``` java

cd primo
ng serve
** NG Live Development Server is running on http://localhost:4200. **
 //...
 // uma  porção de outras mensagens
 //...
Compiled successfully.

```
#### 3. Alterando a aplicação gerada 

Abra o VSC e edit o arquivo `app.component.html` para o código abaixo:


```html
<div style="text-align:center">
  <h1>
    Olá Mundo! Seja bem-vindo ao {{ title }} Angular 6!
  </h1>
  <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
</div>
```
No browser digite: 

`localhost:4200`

#### 4. Executando testes unitários usando o Karma

Usando o VSC altere o arquivo `app.component.spec.ts` para o conteúdo do código abaixo:

```TypeScript
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'primo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('primo');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Olá Mundo! Seja bem-vindo ao');
  });
});
```
No prompt de comandos, execute

`ng test`

Pronto! Você criou e executou os testes unitários na sua primeira aplicação Angular





Neste aplicativo simples, abordaremos a maioria dos aspectos essenciais do Angular, incluindo:
- Construção de componentes personalizados;
- Formulários com entrada de dados do usuário;
- Renderização de listas de objetos em views;
- Interceptação de cliques do usuário para atuar sobre eles; e 
- Disponibilizar nosso aplicativo em um servidor

#### 1. Criando a aplicação primo 



::: :walking: Passo a passo :::

**a.** Instale o Node.js para o seu SO : Mac, Linux ou Windows clicando no link https://nodejs.org/en/download/

O Node.js é um runtime assíncrono e baseado em eventos para a linguagem JavaScript. Foi projetado para criar aplicativos de rede escalonáveis. É uma marca registrada da Joyent, Inc.

Nós iremos usar o Node.js como servidor para executar o nosso exemplo.
Você poderá instalar o Node, através desta página https://nodejs.org/en/download/

No momento da escrita deste material a última versão estável era: 10.14.1 (incluindo o npm 6.4.1)

**b**. Instale o TypeScript usando o seguinte no seu prompt:

```
npm install -g typescript
```

A linguagem TypeScript foi criada pela Microsoft, e tem sido uma escolha comum entre os desenvolvedores ASP.NET. Não se trata de uma linguagem completamente nova, mas sim superconjunto do JavaScript, leia este artigo interessantíssimo sobre a evolução do JavaScript https://www.excella.com/insights/typescript-vs-es6-vs-es2015 , vale a pena!

Na realidade não é obrigatório usar a linguagem typescript para usar o Angular. O Angular tem uma API do ES5, mas o Angular é escrito em TypeScript e geralmente é o que todos estão usando. Vamos usar o TypeScript  porque é uma ótima linguagem e facilita o trabalho com o Angular. 
Fique livre para ler um pouco mais sobre usar o Angular com o Java Script (ES5), veja esse blog https://blog.thoughtram.io/angular/2015/05/09/writing-angular-2-code-in-es5.html que explica como é possível usar o Angular com o JavaScript ES5.

**c**. Instale o Angular CLI

```
npm install -g @angular/cli@7.0.6
```
<p align="center">
  <img src="imagens/AnglularCli.png" alt="Imagem do Angula CLI">
</p>
<p align="center">
   <strong>Figura 1- Imagem do Angular CLI mostrando as versões instaladas</strong> 
</p>

O Angular CLI é um utilitário que permitir aos usuários criar e gerenciar projetos, usando o `prompt`. 

Ele automatiza tarefas como, por exemplo, a criação de projetos completos usando o Angular ou, simplesmete, a adição de novos `controllers` em projetos já existentes. 

Você vai observar que o Angular usa muitos arquivos que devem estar oreganizados, adequadamente, em pastas. Por isso é sempre uma boa prática usar o Angular CLI, para que os seus projetos mantenham sempre os mesmos padrões.

**d.** Verifique a versão que foi instalada, digitanto `ng --version`


**e.** Na pasta `Angular`, digite o seguinte comando no prompt: 

```
ng new primo
```
Veja na Figura 2 o que foi criado pelo Angular CLI

<p align="center">
  <img src="imagens/EstruturaDePastas.png" alt="Estrutura de pastas criada peloi Angula CLI">
</p>
<p align="center">
   <strong>Figura 2- Estrutura de pastas criada peloi Angula CLI para o projeto ola-mundo</strong> 
</p>

#### 2. Executando a aplicação ola-mundo 

``` java

cd primo
ng serve
** NG Live Development Server is running on http://localhost:4200. **
 //...
 // uma  porção de outras mensagens
 //...
Compiled successfully.

```
#### 3. Alterando a aplicação gerada 

Abra o VSC e edit o arquivo `app.component.html` para o código abaixo:


```html
<div style="text-align:center">
  <h1>
    Olá Mundo! Seja bem-vindo ao {{ title }} Angular 6!
  </h1>
  <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
</div>
```
No browser digite: 

`localhost:4200`

#### 4. Executando testes unitários usando o Karma

Usando o VSC altere o arquivo `app.component.spec.ts` para o conteúdo do código abaixo:

```TypeScript
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'primo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('primo');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Olá Mundo! Seja bem-vindo ao');
  });
});
```
No prompt de comandos, execute

`ng test`

Pronto! Você criou e executou os testes unitários na sua primeira aplicação Angular




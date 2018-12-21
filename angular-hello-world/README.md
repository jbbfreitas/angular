# Angular Hello World 

###  Construindo uma primeira aplicação web usando o Angular

Neste aplicativo simples, abordaremos a maioria dos aspectos essenciais do Angular, incluindo:
- Construção de componentes personalizados;
- Formulários com entrada de dados do usuário;
- Renderização de listas de objetos em views;
- Interceptação de cliques do usuário para atuar sobre eles; e 
- Disponibilizar nosso aplicativo em um servidor

#### 1. Construção de componentes personalizados 

::: :mortar_board: Novo conceito :::

Primeiramente vamos definir o que vem a ser um **componente** para o Angular

A linguagem HTML tem um conjunto limitado de tags: por exemplo `<h1>`, `<div>`, `<image>` etc. Os browsers estão preparados para renderizar esse conjunto de tags.
Não seria interessante se pudéssemos criar novas tags com um conjunto de funcionalidades pré-programadas?

Essa é a idéia por traz dos componentes : criar novas tags que conteriam  blocos de código que irão ser renderizados pelos browsers e apresentados ao usuário.
Então vamos mostrar como se cria um novo componente Angular.

::: :walking: Passo a passo :::


**1.** Na pasta `Angular`, digite o seguinte comando no prompt: 

```
ng new angular-hello-world
```

Faça `cd angular-hello-world`

Nosso primeiro componente se chamará `<app-hello-world></app-hello-world>`.
Como você pode observar os componentes são tags e usam o símbolo `<>`.
Esse nosso primeiro componente não fará muitra coisa, irá apenas exibir uma mensagem de saudação.

A maneira mais simples de criar componentes Angular é usar a própria ferramenta fornecida com o Angular CLI.

Digite:
```
ng generate component app-hello-world
```
O Angular CLI irá criar uma pasta denominada `hello-world` contendo 4 arquivos:
- hello-world.component.css
- hello-world.component.html
- hello-world.component.spec.ts
- hello-world.component.ts

Vamos explicar detalhadamente cada um dos arquivos:

O arquivo `hello-world.component.css` define um estilo que pode ser utilizado para renderizar o componente. Para saber mais sobre css consulte [aqui](https://www.w3schools.com/css/css_intro.asp).

O arquivo `hello-world.component.html` define na linguagem html, o que será exibido para o usuário.

O arquivo `hello-world.component.spec.ts` é o teste unitário para esse componente, usando o Karma. Para saber mais sobre o Karma clique [aqui](https://karma-runner.github.io/latest/index.html)

O arquivo `hello-world.component.ts` é o código TypeScript que está por trás do nosso componente.

```javascript {.line-numbers}
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


```









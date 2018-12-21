# Angular (jbbf)
## O que é o Angular?

De acordo com o https://angular.io/docs 

> "O Angular é uma plataforma que facilita a criação de aplicativos para a web. É uma combinação integrada de modelos declarativos, injeção de dependência, ferramentas de ponta a ponta e práticas recomendadas para resolver os desafios de desenvolvimento. Além da Web, o Angular também permite que os desenvolvedores criem aplicativos  para  dispositivos móveis bem como para o desktop." 
### Construindo uma primeira aplicação web usando o Angular

Neste aplicativo simples, abordaremos a maioria dos aspectos essenciais do Angular, incluindo:
- Construção de componentes personalizados;
- Formulários com entrada de dados do usuário;
- Renderização de listas de objetos em views;
- Interceptação de cliques do usuário para atuar sobre eles; e 
- Disponibilizar nosso aplicativo em um servidor

#### 1. Criando a aplicação ola-mundo 



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

cd ola-mundo
ngserve
** NG Live Development Server is running on http://localhost:4200. **
 //...
 // uma  porção de outras mensagens
 //...
Compiled successfully.

```
#### 3. Criando um primeiro componente

Uma das vantagens do Angular, talvez a mais fantástica delas,  é a possibilidade de se criar novos componentes. Os navegadores, entretanto, só “entendem” um conjunto limitado de tags que já estejam disponíveis na linguagem HTML,  tais como, como `<form>` ,` <image>` etc. 

E se quisermos criar novas tags tal como `<clima-tempo>` ou a tag `<login>` que mostre um painel de login? 

Esta é, justamente, a ideia que está por trás dos componentes: "ensinar" novas tags ao navegador! 

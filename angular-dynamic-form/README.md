# DynamicForm

Este projeto foi criado baseando-se no [Trabalho de Bahurudeen](https://medium.com/@mail.bahurudeen/create-a-dynamic-form-with-configurable-fields-and-validations-using-angular-6-994db56834da)

##  Criando a aplicação DynamicForm 

::: :walking: Passo a passo :::

**1.** Crie um novo projeto

```
ng new dynamic-form
```

**2.** Vá para a pasta recém-criada
```
cd dynamic-form
```

**3.** Adicione a biblioteca Angular Material

```
ng add @angular/material @angular/cdk
```

**4.** Instale `@angular/material-moment-adapter` e `moment`. Eles são dependencias para `Material Datepicker`.
```
npm install --save @angular/material-moment-adapter moment
```

**5.** Crie um `custom module` com o nome de  `material`.

```
ng generate module material --flat
```

**6.**Crie um diretório `components` dentro do diretório `app`.

```
mkdir src/app/components
```
**7.**Gere cada um dos tipos de componentes.

```
ng generate component components/input --inline-style=true --inline-template=true --spec=false --module app
```

```
ng generate component components/button --inline-style=true --inline-template=true --spec=false --module app
```

```
ng generate component components/select --inline-style=true --inline-template=true --spec=false --module app
```

```
ng generate component components/date --inline-style=true --inline-template=true --spec=false --module app
```

```
ng generate component components/radiobutton --inline-style=true --inline-template=true --spec=false --module app
```

```
ng generate component components/checkbox --inline-style=true --inline-template=true --spec=false --module app
```

**8.**Crie um diretório `dynamic-field` dentro do diretório `components`.

```
mkdir src/app/components/dynamic-field
```

**9.**Crie a diretiva `dynamic-field` dentro do diretório `app/components/dynamic-field`.

```
ng generate directive components/dynamic-field/dynamic-field --spec=false --module app
```

**10.**Crie um diretório `dynamic-form` dentro do diretório `components`.

```
mkdir src/app/components/dynamic-form
```

**11.**Crie um componente `dynamic-form` dentro do diretório `app/components/dynamic-form`.

```
ng generate component components/dynamic-form --inline-style=true --inline-template=true --spec=false --module app
```

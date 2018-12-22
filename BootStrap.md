# BootStrap to Angular (jbbf)

## Cono ocorre a ordem de chamada dos módulos do Angular

A ordem de chamada dos módulos do angular, ocorre na seguinte ordem:

1. O primeiro arquivo que o Angular lê é o `angular.json`
    - Esse é um arquivo de configuração do tipo `json` que tem uma propriedade `"main": "src/main.ts"` que informa o módulo principal do Angular.
2. No arquivo  `main.ts` a linha `platformBrowserDynamic().bootstrapModule(AppModule)` carrega o `AppModule`.
    - Esse arquivo informa todos os componentes que podem ser utilizados na aplicação. Veja na Listagem 1 o parâmetro `declarations`.
    - Além disso, informa que o `bootstrap` é `AppComponent`.
    - Portanto o `app` (com seus 4 arquivos) é  o componente que inicia a pilha de componentes nessa aplicação. 

```javascript
@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    UserItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
<p align="center">
   <strong>Listagem 1- app.module.ts</strong> 
</p>

3. A partir de `app.component.html` os demais componentes são invocados.

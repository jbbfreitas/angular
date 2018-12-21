# Debugando um projeto Angular (jbbf)
::: :walking: Passo a passo :::

**a.** Instale o [Chrome Debugger Extension](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)

**b.** Crie um arquivo launch.json (dentro da pasta .vscode, na raiz do seu projeto)


```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:4200/#",
      "webRoot": "${workspaceFolder}"
    },
    {
      "name": "Attach Chrome",
      "type": "chrome",
      "request": "attach",
      "url": "http://localhost:4200/#",
      "webRoot": "${workspaceFolder}"
    },
    {
      "name": "Launch Chrome (Test)",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:9876/debug.html",
      "webRoot": "${workspaceFolder}"
    },
    {
      "name": "Launch Chrome (E2E)",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/protractor/bin/protractor",
      "protocol": "inspector",
      "args": ["${workspaceFolder}/protractor.conf.js"]
    }
  ]
}

```

**c.** Crie um arquivo tasks.json (dentro da pasta .vscode, na raiz do seu projeto)

```json
{
    "version": "2.0.0",
    "tasks": [
      {
        "identifier": "ng serve",
        "type": "npm",
        "script": "start",
        "problemMatcher": [],
        "group": {
          "kind": "build",
          "isDefault": true
        }
      },
      {
        "identifier": "ng test",
        "type": "npm",
        "script": "test",
        "problemMatcher": [],
        "group": {
          "kind": "test",
          "isDefault": true
        }
      }
    ]
  }
```
**d.** Para iniciar o servidor pressione `CTRL+SHIFT+B`

**e.** Escolha o break point em uma arquivo `.TS`

**f.** Para debugar a aplicação pressione `F5` 

::: :pushpin: Importante :::

> Para o Debug funcionar é preciso que todas as janelas do Chrome estejam inicialmente fehcadas!
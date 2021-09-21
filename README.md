#Estrutura 
O projeto, é um CRUD de usuários em Angular 8, foi pensado de forma modular,criado ao redor do objeto principal onde todos componentes estão correlacionados a tal pasta/módulo, com intuito de facilitar a procura de componentes e melhor manutenibilidade, então o tipo de estrutura foi da seguinte forma:

...src/app/

|-- USER

    |-- user.module
        |-- [+] components
        |-- user.service.ts
        |-- user.module.ts
        |-- user.routes.ts

    |-- module2 
        |-- [+] components
        |-- module2.service.ts
        |-- module2.module.ts
        |-- module2.routes.ts

|-- shared
        |-- [+] components
        |-- [+] mocks
        |-- [+] models
        |-- [+] directives
        |-- [+] pipes

|-- core
        |-- [+] authentication
        |-- [+] footer
        |-- [+] guards
        |-- [+] http
        |-- [+] interceptors
        |-- [+] mocks
        |-- [+] services
        |-- [+] header

|-- app.module.ts
|-- app.component.ts

Dessa forma o intuito é que cada objeto/pasta(principal) tenha seu service, module e componentes, facilitando assim a visão e entendimetno do projeto.
Vale uma observação que o user.service ficou na pasta _service devido ela esta sendo utilizada em toda aplicação, por se tratar do cadastro de pessoas e usuários.
Tambem não vi necessidade de colocar uma routing para o pasta User por conter apenas um modulo, mas no geral aplicações são inseridas rotas para cada pacote.

Na aplicação foi inserido autenticação via token com JWT que esta senod inserida no header das requisições. Foi configurado o Auth Guard para caso um usuário, por exemplo, não tenha acesso a determinada página , ele será redirecionado para a tela de login.

# AngularSpringTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# BestifyYourTime

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

Changes by Apurva : 
Modules : admin = module + components | users = module + components

folders for services, classes and interfaces are created

for bootstrap,  ngx-bootstrap is installed

Create components : 
 1. Users Module  : ng g c users\components\user_component_name
 2. Admin Module : ng g c admin\components\admin_component_name
 3. Common Module : ng g c common\common_component_name

 Routing : 
 1. Users Module : users.module.tc -> routes array
 2. Admin Module : admin.module.tc -> routes array
 3. Lazy Loading : app-routing.module.ts -> routes array

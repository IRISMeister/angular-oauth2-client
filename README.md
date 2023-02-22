# AngularOauth2Client

Angular(SPA)-IRIS(認可サーバ、リソースサーバ)間で[認可コードフロ](https://openid-foundation-japan.github.io/rfc6749.ja.html#grant-code)ーを確認する。

```
$ git clone https://github.com/IRISMeister/angular-oauth2-client.git
$ cd angular-oauth2-client/myapp
$ npm install
$ ng build --configuration production
$ cp dist/myapp/* ../../iris-oauth2/htdocs/
```

# 謝辞
こちらのサイトを参考にさせていただきました。
https://qiita.com/okomeme/items/2d8c9481baa66e8821c5

# Myapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

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

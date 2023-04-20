# AngularOauth2Client

Angular(SPA)-IRIS(認可サーバ、リソースサーバ)間で[認可コードフロ](https://openid-foundation-japan.github.io/rfc6749.ja.html#grant-code)ーを確認するためのサンプルコードです。

> 本例の実行には[こちらのoAuth2環境](https://github.com/IRISMeister/iris-oauth2)が必要です。

SPAと、SPA+[BFF](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps#section-6.2
)(Backend for Frontend)スタイルの2種類があります。

## SPA(Angular)

F5(リロード)対策としてアクセストークンをsessionStorageに保存しています。XSS脆弱性に対してご注意ください。  

### 導入手順

LinuxあるいはWindowsで実行します。  
ビルド・実行にはnode, npm, ngが必要です。私の環境は以下の通りです。Windowsでも同じことが出来ます。

> Linuxの場合、(ビルドするだけで、後述のデバッグ環境には向きませんが)Dockerを使用してビルド出来ます。node等のインストールは不要です。

> Windowsの場合、./build_and_deploy.ps1, ng-start.ps1内の$env:gitrootの値を環境にあわせて修正してください。
```
$ ng version

Angular CLI: 15.1.6
Node: 16.16.0
Package Manager: npm 9.3.0
OS: linux x64

Angular: 15.1.5
... animations, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1501.6
@angular-devkit/build-angular   15.1.6
@angular-devkit/core            15.1.6
@angular-devkit/schematics      15.1.6
@angular/cli                    15.1.6
@schematics/angular             15.1.6
rxjs                            7.8.0
typescript                      4.9.5

```
下記の手順でビルドしたangularアプリケーションのディストリビューション(./dist/*)を、iris-oauth2のhtdocs/下にコピーすることで使用可能になります。

1. Git Clone

    カレントディレクトリが./iris-oauth2であることを確認してください。その1階層上のディレクトリに移動して、cloneします。
    ```bash
    $ pwd
    /home/irismeister/git/iris-oauth2
    $ cd ..
    $ git clone https://github.com/IRISMeister/angular-oauth2-client.git
    $ cd angular-oauth2-client
    ```
  Dockerを使用してビルドする場合は、下記コマンドを実行してください。2.以降は不要です。
  ```
  $ ./build_and_deploy-docker.sh
  ```

2. 
    ```bash
    $ npm install
    $ ./build_and_deploy.sh   (Windowsの場合は>powershell ./build_and_deploy.ps1)
    ```
    このシェルは下記を行います。
    - client_id, client_secretをサーバ配下のファイル(environment*.ts)から取得  
    - NGビルド実行。 ターゲットは/myapp/  
    - htdocs/myapp/以下にビルド成果物をコピー  
    - NGビルド実行。 ターゲットは/myapp2/  
    - htdocs/myapp2/以下にビルド成果物をコピー  

    下記のように表示されれば成功です。
    ```bash
    $ ./build_and_deploy.sh
    ✔ Browser application bundle generation complete.
    ✔ Copying assets complete.
    ✔ Index html generation complete.
          ・
          ・
          ・
    Build at: 2023-04-05T07:23:58.705Z - Hash: 67aabdbbe8ad0bfa - Time: 6796ms
    deploying to iris-oauth2
    done
    Go to https://webgw.localdomain/myapp/ or https://webgw.localdomain/myapp2/
    $
    ```



以後、iris-oauth2をリビルドするなどで、client_id,client_secretが変更された場合は、build_and_deploy.shを再実行してください。

### 起動方法

こちらはApacheを使用しますので単独の起動方法はありません。サーバ用のコンテナ起動時に自動起動します。

### アクセス方法

---------

|名称|エンドポイント|
|:--|:--|
|SPAアプリケーション|[/myapp](https://webgw.localdomain/myapp/)|
|SPAアプリケーション|[/myapp2](https://webgw.localdomain/myapp2/)|

---------

両者は、client_idが異なる(つまり別のRPとみなす)だけ内容は同じです。下記のような「最高にクール」な画面が表示されます。

![](https://raw.githubusercontent.com/IRISMeister/iris-oauth2/main/docs/images/spa1.png)

「BFF接続テスト」を押すとBFFとの疎通確認を行い、成功の場合IRISバージョンを画面表示します。

「SPAでログイン」を押すと、SPAのみで認証を行います。下記のような画面が表示されれば成功です。適当にボタンを押して(処理内容はボタンが示す通りです)動作確認してください。  
![](https://raw.githubusercontent.com/IRISMeister/iris-oauth2/main/docs/images/spa2.png)

### 修正・デバッグ

修正・デバッグ目的で、Angular Live Development Serverで起動することができます。
```
./ng-start.sh (Windowsの場合は>powershell ./ng-start.ps1)
```

Compiled successfullyという起動メッセージが表示されたら、[Angularアプリケーション(live)](http://webgw.localdomain:4200/myapp)にアクセスします。

### よくあるエラー
Unexpected request - client_idと表示される場合、(恐らく)client_idが正しく反映されていません。build_and_deploy.shで直ります。

ビルド時に下記のようなエラーが出る場合、iris-oauth2のバージョンが古いです。iris-oauth2をgit pullしてビルドしてください。
```
$ ./build_and_deploy.sh
✔ Browser application bundle generation complete.

Error: src/app/display-info-bff/display-info-bff.component.ts:44:26 - error TS2339: Property 'OP' does not exist on type '{ clientId: string; authUri: string; logoutUri: string; tokenUri: string; userinfoUri: string; redirectUri: string; scope: string; frontchannel_logout_uri: string; post_logout_redirect_uri: string; }'.

44     if (environment.auth.OP==='iris') {
                            ~~
```

### 今後の修正
今後のドキュメントへの加筆・修正等は[こちら](https://github.com/IRISMeister/angular-oauth2-client)で行います。

## SPA(Angular)+REST+BFF

Webアプリケーションではセッション管理にCSPセッションを使用していますが、SPA+BFFでは独自のセッションを作成しています。  
> sessionidというクッキー名です。

SLOが機能します。

### 導入手順
SPA(Angular)に同梱されています。
### 起動方法
SPA(Angular)と同時に起動されます。

### アクセス方法
SPA(Angular)と同じです。

「SPA+BFFでログイン」を押すと、SPA+BFFで認証を行います。下記のような画面が表示されれば成功です。SPAとほぼ同じですが、こちらにはBFFサーバの情報表示とトークンの取り消し機能が追加されています。    
![](https://raw.githubusercontent.com/IRISMeister/iris-oauth2/main/docs/images/spa3.png)

## 備忘録
### コンポーネント追加方法
```
ng generate component mypage
```

src/app/app-routing.module.tsにimport文とpathを追加。
```
import { MypageComponent } from './mypage/mypage.component';

  {path: 'mypage', component: MypageComponent},

```

src/app/mypage/mypage.component.tsを実装。

## 謝辞
こちらのサイトを参考にさせていただきました。

https://qiita.com/okomeme/items/2d8c9481baa66e8821c5  
https://roytuts.com/angular-okta-sso-single-sign-on-with-pkce/  
https://manfredsteyer.github.io/angular-oauth2-oidc/docs/index.html  

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

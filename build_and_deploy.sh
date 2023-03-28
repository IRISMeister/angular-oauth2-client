#!/bin/bash

# assuming you have already cloned iris-oauth2-private
cp  $HOME/git/iris-oauth2-private/client/environment.prod*.ts src/environments/
cp  $HOME/git/iris-oauth2-private/client/environment.ts src/environments/
ng build --configuration production --base-href=/myapp/
echo "deploying to iris-oauth2"
rm -fR $HOME/git/iris-oauth2-private/htdocs/myapp/*
cp -fR dist/myapp/* $HOME/git/iris-oauth2-private/htdocs/myapp/

ng build --configuration production2 --base-href=/myapp2/
echo "deploying to iris-oauth2"
rm -fR $HOME/git/iris-oauth2-private/htdocs/myapp2/*
cp -fR dist/myapp/* $HOME/git/iris-oauth2-private/htdocs/myapp2/

echo "done"
echo "Go to https://webgw.localdomain/myapp/ or https://webgw.localdomain/myapp2/"

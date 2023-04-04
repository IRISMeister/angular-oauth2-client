#!/bin/bash

# assuming you have already cloned iris-oauth2
cp  ../iris-oauth2/client/environment.prod*.ts src/environments/
cp  ../iris-oauth2/client/environment.ts src/environments/
ng build --configuration production --base-href=/myapp/
echo "deploying to iris-oauth2"
rm -fR ../iris-oauth2/htdocs/myapp/*
cp -fR dist/myapp/* ../iris-oauth2/htdocs/myapp/

ng build --configuration production2 --base-href=/myapp2/
echo "deploying to iris-oauth2"
rm -fR ../iris-oauth2/htdocs/myapp2/*
cp -fR dist/myapp/* ../iris-oauth2/htdocs/myapp2/

echo "done"
echo "Go to https://webgw.localdomain/myapp/ or https://webgw.localdomain/myapp2/"

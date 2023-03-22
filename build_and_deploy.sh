#!/bin/bash

# assuming you have already cloned iris-oauth2
cp  $HOME/git/iris-oauth2/client/environment.prod.ts src/environments/
cp  $HOME/git/iris-oauth2/client/environment.ts src/environments/
ng build --configuration production --base-href=/myapp/
echo "deploying to iris-oauth2"
rm -fR $HOME/git/iris-oauth2/htdocs/myapp
cp -fR dist/myapp $HOME/git/iris-oauth2/htdocs/
echo "done"

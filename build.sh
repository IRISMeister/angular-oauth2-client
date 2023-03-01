#!/bin/bash

# assuming you have already cloned iris-oauth2
cp  ../iris-oauth2/client/environment.prod.ts src/environments/
ng build --configuration production --base-href=/myapp/
echo "deploying to iris-oauth2"
rm -fR ../iris-oauth2/htdocs/myapp
cp -fR dist/myapp ../iris-oauth2/htdocs/
echo "done"

#!/bin/bash
npm install
ng build --configuration production
rm ../iris-oauth2/htdocs/*.html
rm ../iris-oauth2/htdocs/*.css
rm ../iris-oauth2/htdocs/*.js
rm ../iris-oauth2/htdocs/*.ico
cp dist/myapp/* ../iris-oauth2/htdocs/

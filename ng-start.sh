#!/bin/bash
cp  $HOME/git/iris-oauth2-private/client/environment.prod.ts src/environments/
cp  $HOME/git/iris-oauth2-private/client/environment.ts src/environments/

ng serve --host webgw.localdomain --disable-host-check --proxy-config proxy.conf.json --serve-path myapp 

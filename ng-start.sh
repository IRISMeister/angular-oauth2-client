#!/bin/bash
cp  ../iris-oauth2/client/environment.prod.ts src/environments/
cp  ../iris-oauth2/client/environment.ts src/environments/

ng serve --host webgw.localdomain --disable-host-check --proxy-config proxy.conf.json --serve-path myapp 

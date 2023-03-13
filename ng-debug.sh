#!/bin/bash
#
# echo 192.168.11.48 webgw.localdomain | sudo tee -a /etc/hosts 
# 192.168.11.48 is an IP address of this host in order to access from your client PC.
# You can use 127.0.0.1 with WSL2
ng serve --host webgw.localdomain --disable-host-check --serve-path myapp

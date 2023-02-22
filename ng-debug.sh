#!/bin/bash
# 192.168.11.48 is an IP address of this host in order to access from your client PC.
#
# echo 192.168.11.48 webgw.localdomain | sudo tee -a /etc/hosts 
ng serve --host webgw.localdomain --disable-host-check

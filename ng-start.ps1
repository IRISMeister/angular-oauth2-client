# assuming your distro is Ubuntu-22.04
$env:gitroot="\\wsl$\Ubuntu-22.04/home/irismeister/git/iris-oauth2"
cp $env:gitroot/client/environment.ts src/environments/

ng serve --host webgw.localdomain --disable-host-check --proxy-config proxy.conf.json --serve-path myapp 

# Efizity News

## Entorno de desarrollo
* ruby 2.6.6
* rails 6.0.6.1
* nodejs 10.24.1
* yarn 1.22.21
* postgreSQL 10
* Ubuntu 18.04
* rvm 1.29.12


## Instalación

### RVM
__RVM__ es una herramienta que permite tener múltiples instalaciones de *Ruby* en el sistema. Para su instalación, se debe contar con *cURL* instalado:
```
sudo apt install curl
```
Instalar __RVM__ haciendo uso de *cURL*:
```
\curl -sSL https://get.rvm.io | bash
```
Modificar la consola *bash* para que reconozca las instrucciones de __RVM__:
```
echo 'source "$HOME/.rvm/scripts/rvm"' >> ~/.bashrc
```
Cerrar sesión para que los cambios a la consola de comandos se apliquen a partir de nuevas sesiones.
Abrir la terminal y completar la instalación solicitando las partes de __RVM__ que faltan:
```
rvm requirements
```

### Ruby
Con __RVM__ instalado, la instalación de *Ruby* en la versión necesaria se realiza con el siguiente comando:
```
rvm install ruby-2.6.6
```
Dejar la instalación de *Ruby* v2.6.6 como por defecto:
```
rvm --default use 2.6.6
```

### Rails
Una vez instalado *Ruby*, la instalación de *Rails* se realiza a través de la instalación de la gema *'rails'*:
```
gem install rails -v 6.0.6.1
```
Para comprobar la instalación y versión de *Rails*:
```
rails -v
```

### Node.js
Agregar repositorio de origen de la descarga:
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
```
Luego, instalar:
```
sudo apt install -y nodejs
sudo apt install gcc g++ make
```
Alternativamente se puede instalar la versión específica de *Node.js* haciendo uso de __NVM__. Al igual que *RVM*, esta herramienta permite instalar múltiples versiones de *Node.js* en el sistema. Para mayor información sobre la instalación y uso, consultar su [documentación oficial](https://github.com/nvm-sh/nvm).

### Yarn
La instalación de *Yarn* se realiza ejecutando los siguientes comandos:
```
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```
Alternativamente, *Yarn* puede ser instalado haciendo uso de *npm* tras haber concluído la instalación de *Node.js* con el siguiente comando:
```
npm install -g yarn
```

### PostgreSQL
Instalar PostgreSQL en el sistema:
```
sudo apt install postgresql postgresql-contrib libpq-dev
```
ingresar como usuario postgres
```
sudo su - postgres
psql
```
Crear un rol para tu usuario actual, su base de datos por defecto y su password de acceso:
```
create role 'tu_usuario' with createdb login password 'tu_password';
```
Salir de la consola
```
\q
```

### Instalar gema bundler
```
gem update --system
gem install bundler
```

## Clonar, instalar dependencias y desplegar en entorno de desarrollo
Clonar repositorio e ingresar a su directorio:
```
git clone https://github.com/Rthel87/Efizity-challenge.git efizity-challenge
cd efizity-challenge
```
Generar archivo de variables de entorno para la aplicación copiando archivo .env_example a .env y editarlo:
```
cp .env_example .env
nano .env
```
cambiar valores de variables de entorno, ejemplo:
```
DB_USERNAME='nombre_usuario_BD'
DB_PASSWORD='password_del_usuario_BD'
DB_HOST='el_host_de_la_BD' # En instalaciones locales: localhost
```
Para instalar las dependencias, se debe tener instalada la gema *bundler* (ver las instrucciones de instalación en la sección __Instalación__):
```
bundle install
```
Crear la base de datos y aplicar las migraciones:
```
rails db:create db:migrate
```
Desplegar la aplicación en entorno de desarrollo:
```
rails server
```

## Pruebas de la aplicación
Para ejecutar las pruebas automatizadas de la aplicación, es necesario generar la base de datos de *pruebas* con los siguientes comandos:
```
rails db:test:purge
rails db:prepare
```
Luego, ejecutar los test:
```
rails test
```



# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

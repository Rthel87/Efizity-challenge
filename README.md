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
Abrir nuevamente la consola de comandos y completar la instalación solicitando los requerimientos de __RVM__ faltantes:
```
rvm requirements
```

### Ruby
Con __RVM__ instalado, la instalación de *Ruby* en la versión requerida se realiza con el siguiente comando:
```
rvm install ruby-2.6.6
```
Dejar la instalación de *Ruby* v2.6.6 como instalación por defecto:
```
rvm --default use 2.6.6
```

### Ruby on Rails (RoR)
Una vez instalado *Ruby*, la instalación de *RoR* se realiza a través de la instalación de la gema *rails*:
```
gem install rails -v 6.0.6.1
```
Para comprobar la instalación y versión de *RoR*:
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
Cambiar usuario del sistema a usuario *postgres* y ejecutar la consola de comandos:
```
sudo su - postgres
psql
```
Crear un rol para el usuario del sistema, su base de datos por defecto y agregar su clave de acceso:
```
create role 'usuario_sis' with createdb login password 'password_sis';
```
Salir de la consola de *postgres*:
```
\q
```
Volver al usuario del sistema:
```
exit
```

### Instalar gema bundler
Con la instalación de *Ruby* ya realizada, instalar la gema *bundler* a usarse con *RoR*
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

## Despliegue en producción
### Instalación directa en el servidor
La siguiente descripción del despliegue de la aplicación se realiza para un servidor con Ubuntu 18.04. Para otras versiones de distribución pueden haber variaciones en los comandos indicados. Se considera que ya se encuentran instaladas las dependencias necesarias. Para su instalación, ver el apartado de __Instalación__.

#### Instalación en producción con la configuración actual
Ingresar al directorio de trabajo. Para ejemplificar se utiliza la carpeta */opt* del sistema. Clonar el repositorio con permisos de superusuario:
```
cd /opt
sudo git clone https://github.com/Rthel87/Efizity-challenge.git efizity-challenge
```
Cambiar los permisos de acceso a la carpeta de la aplicación e ingresar al directorio de la aplicación:
```
sudo chown -R usuario-sis.usuario-sis efizity-challenge
sudo chmod -R 775 efizity-challenge
cd efizity-challenge
```
Crear el archivo de variables de entorno de la aplicación:
```
cp .env_example .env
nano .env
```
Cambiar valores por parámetros de producción:
```
DB_USERNAME='usuario_BD_produccion'
DB_PASSWORD='password_BD_produccion'
DB_HOST='host_BD_produccion'
```
Instalar las dependencias de la aplicación en entorno de producción:
```
bundle install --deployment --without development test
```
Generar la clave secreta de *RoR* para el entorno de producción:
```
SECRET_ENV_VAR=$(bundle exec rails secret)
echo -e "production:\n  secret_key_base:" > ./config/.example_secrets.yml
echo "$(cat ./config/.example_secrets.yml) $SECRET_ENV_VAR" > ./config/secrets.yml
```
Inicializar la base de datos en producción:
```
bundle exec rails db:create db:migrate RAILS_ENV=production
```
Arrancar la aplicación en producción:
```
rvmsudo bundle exec passenger start
```
La aplicación se iniciará en el puerto 80 del servidor.

#### Cambiar la configuración de la ejecución de la aplicación en producción
La configuración de la ejecución de la aplicación en entorno de producción se encuentra definida en el archivo *Passengerfile.json* que se encuentra en el directorio raíz de la aplicación. La estructura del archivo de configuración de Passenger es la siguiente:
```
{
  "environment": "production",   // Se indica el entorno que se ejecutará
  "port": 80,                    // Se indica el puerto de trabajo
  "daemonize": true,             // Se indica que debe correr en modo 'demonio'
  "user": "usuario"              // Se indica el usuario que hará uso de la aplicación
}
```

#### Actualizar la aplicación
Para actualizar la aplicación a su versión más reciente, ingresar a la carpeta raíz y ejecutar:
```
cd /opt/efizity-challenge
git pull
```
Instalar las nuevas dependencias de la aplicación:
```
bundle install --deployment --without development test
```
Instalar las nuevas migraciones de la actualización de la aplicación:
```
bundle exec rails db:migrate RAILS_ENV=production
```
Reiniciar la aplicación:
```
bundle exec passenger-config restart-app $(pwd)
```

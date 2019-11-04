# Mi Argentina

Portal digital del Ciudadano.

## Instalar Meteor
```
curl https://install.meteor.com/ | sh
```

## Clonar el proyecto

```
$ git clone https://gitlab.argentina.gob.ar/argentina/miargentina.git
$ cd miargentina/
$ meteor npm install
$ cp settings.json.edit settings.json
```

## Configurar los endpoints de ID

```
{
    "public": {
        "id":"http://project-id.gob.ar",
        "miargentina":"http://project-mi-argentina.gob.ar",
        "argentinagobar": "https://www.argentina.gob.ar",
        "gtm":  {
            "id": "your-gtm-code"
        }
    },
    "oidc": {
        "authEndpoint": "http://project-id.gob.ar/authorize/",
        "tokenEndpoint": "http://project-id.gob.ar/token/",
        "userinfoEndpoint": "http://project-id.gob.ar/userinfo/",
        "clientId": "your-client-id",
        "secret": "your-secret-id"
    }
}

Solicitar CREDENCIALES para CRM y APIGAteway

```

## Configurar los endpoints de SILO

```
{
  "silo": {
    "apiBaseUrl": "http://{SILO_URL}/{SILO_VERSION}/",
    "authUrl": "http://{SILO_URL}/{SILO_VERSION}/api-token-auth",
    "username": "{SILO_USERNAME}",
    "password": "{SILO_PASSWORD}",
    "entity": "{SILO_ENTITY}",
    "autosync": false
  }
}

Setear autosync con true si se requiere sincronizar los datos al loguear.

Solicitar CREDENCIALES para SILO

```

## Ejecutar el proyecto

```
$ meteor run --settings=settings.json
```

## Comandos para los ambientes

Para la ejecución de los comandos en forma remota utilizamos [Fabric](http://docs.fabfile.org/). Se puede instalar facilmente con pip: `pip install fabric`.

```
$ cd miargentina/
$ fab --list
```

## Bases de Datos (LOCALHOST)

Para generar la base de AFIP hay que tener instalado

    - python
    - pip
    - pymongo ($pip install pymongo==3.5.1)
    - xmljson ($pip install xmljson==0.1.9)

Ejecutando el siguiente comando crearemos las bases por primera vez: (Es imprescindible que se este ejecutando el servicio de mongo)

```
$ python /home/[user]/myprojects/miargentina/Crons/CRONcalendarioAFIP.py

```

Si queremos que se actualice automaticamente hay que configurar el Cron del sistema.

Para configurar el cron el cual se correra todos los dias a las 00 hs realizar los siguientes pasos:

```
crontab -e
```
Seleccionar  Opcion (2), editar el archivo de cron agregando la linea siguiente:

```
0 0 */1 * * /usr/bin/python /home/[user]/myprojects/miargentina/Crons/CRONcalendarioAFIP.py > /dev/null 2>&1
```
Luego guardar y salir.

    Para que funcione el cron correctamente el servicio de mongo tiene que estar activo


## Comandos Fabric

Nueva branch en DESA:

```
$ fab -R desa deploydesa:nombreBranch
```

Nuevo tag en PROD:

```
$ fab -R prod deployprod:"tag"      # EJEMPLO fab -R prod deployprod:v0.2.3
```

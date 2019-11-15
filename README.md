<img src="/public/img/logos/miargentina.png" alt="MiArgentina" width="400"/>

## Portal digital del Ciudadano.
Esta es una distribución pública de Mi Argentina, el portal digital del ciudadano desarrollado por la Subsecretaría de Gobierno Digital de la República Argentina en el periodo 2015-2019.

La intención de esta distribución es la reutilización por parte de gobierno nacionales y subnacionales que deseen construir sus plataforma de servicios para ciudadanos. 

Esta versión cuenta con las siguientes funcionalidades:
* Dashboard Ciudadano
* Configuracion de visualización
* Cliente OpenID
* Google Analytics
* Conexión con APIGateway
* Conexion con sender de mails
* Conexion para tracking de errores
* Templates y ejemplos
* Documentación

### Dependencias y Requisitos

- ***Tiene que estar conectado a ID***
- ***Solicitar CREDENCIALES de APIGateway***

### Instalar Meteor
```
curl https://install.meteor.com/ | sh
```

### Clonar el proyecto

```
$ git clone https://github.com/argob/mi-argentina.git
$ cd miargentina/
$ meteor npm install
$ cp settings.json.edit settings.json
```

### Configurar los endpoints de ID

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
```

### Ejecutar el proyecto

```
$ meteor run --settings=settings.json
```

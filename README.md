<img src="/public/img/logos/miargentina.png" alt="MiArgentina" width="400"/>

## Portal digital del Ciudadano.
***

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

### Dependencias y Requisitos

- ***Tiene que estar conectado a ID***
- ***Solicitar CREDENCIALES APIGAteway***

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

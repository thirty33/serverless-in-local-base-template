Este es un repositorio base para pruebas, por si se desea trabajar en local con aws lambdas y dynamodb sin tener que subir a la consola de aws

Pasos para usar el template base de trabajo con aws labdas y dynamodb en local

1) descargas e instalar (Recomendado ultima version de Node y npm): npm install

2) Revisar documentacion de serverless-offline: https://www.serverless.com/plugins/serverless-offline

3) Revisar documentacion de serverless-dynamodb-local: https://www.serverless.com/plugins/serverless-dynamodb-local (Importante: instalar el java que pide la web).

4) Ir a la consola de AWS, al servicio IAM Identity and Access Management (IAM) y crear un usuario que tenga todos los permisos para usar todos los servicios de AWS

4.1) Clickear boton agregar usuario
4.2) Setear nommbre de usuario y seleccionar check: "Clave de acceso: acceso mediante programación"
4.3) Clickear en Siguiente:Permisos
4.4) Seleccionar "Asociar directamente las politicas existentes"
4.5) Seleccionar "AdministratorAccess" para dar todos los permisos al usuario
4.6) Clickear en Siguiente:Etiquetas
4.7) Clickear en Siguiente:Revisar
4.8) Clickear en "Crear usuario".
4.9) El sistema le mostrara los valores de la llave de acceso (accessKeyId) y la llave secreta (secretAccessKey), guardar estos valores.

5) dentro del proyecto en la consola correr el comando: serverless config credentials --provider aws --key accessKeyId --secret secretAccessKey --profile IAM-USER. Donde IAM-USER es el usuario
creado dentro de IAM Identity and Access Management (IAM).

6) Dentro del archivo serverless.yml buscar el parametro: "profile" y asignarle el nombre del usuario creado en IAM Identity and Access Management (IAM)

7) entrar en ./lambdas/common/Dynamo.js y setear los valores de accessKeyId y secretAccessKey

8) correr comando: sls dynamodb install

9) correr comando: sls offline start para correr las labdas y la db de Dynamo en local

10) probar los servivios en postman.


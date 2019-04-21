## Para correr la aplicación
```
npm install
node server/server
```

### Activar la base de datos (unix, linux):
```
sudo service mongod start
```
### Para verificar que la base de datos se haya inicializado de la manera correcta:
```
/var/log/mongodb/mongod.log
```
La respuesta debe ser:
```
[initandlisten] waiting for connections on port 27017
```

### Para acceder a mongoDB por la linea de comandos:
```
mongo
```

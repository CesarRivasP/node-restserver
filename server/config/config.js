// Aqui se van a declarar variables y constantes de forma global
// =============================================
// Puerto
// =============================================
process.env.PORT = process.env.PORT || 3000;
//la variable del puerto existe, de hecho al hacer un despliegue en heroku este la actualiza
// esta variable no existe localmente, por lo que establecemos que corra en el puerto 3000


// =============================================
// ENVIROMENTS
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//Si existe algo significa que se esta corriendo en produccion
// Si no existe se establece que se esta corriendo en desarrollo
// Esta variable la establece heroku, que tambien se puede establecer donde se este corriendo un proceso de node


// =============================================
// FECHA DE EXPIRACION DEL TOKEN
//  60  segundos
//  60  minutos
//  24  horas
//  30  dias
// process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
process.env.CADUCIDAD_TOKEN = '48h';

// let date = new Date();

// let calculatedExpiresIn = (((date.getTime()) + (60 * 60 * 1000)) - (date.getTime() - date.getMilliseconds()) / 1000);

// process.env.CADUCIDAD_TOKEN = calculatedExpiresIn;

// =============================================
// SEED (Semilla de autenticacion)
process.env.SEED_TOKEN =  process.env.SEED_TOKEN || 'este-es-el-secret-o-seed-de-desarrollo';
// Para que en git no se visualice el seed de produccion

// =============================================
// DATA BASE
let urlDB;

if (process.env.NODE_ENV === 'dev'){
  urlDB = 'mongodb://localhost:27017/coffe';
}
else {  //cualquier cosa menos dev
  urlDB = process.env.MONGO_URI;
}

process.env.urlDB = urlDB;

// Google CientID
process.env.CLIENT_ID = process.env.CLIENT_ID || '413549487417-laa6vvq5fgvtr3ntneh50lehr9v163ss.apps.googleusercontent.com';

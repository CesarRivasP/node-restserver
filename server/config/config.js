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
// DATA BASE
let urlDB;

if (process.env.NODE_ENV === 'dev'){
  urlDB = 'mongodb://localhost:27017/coffe';
}
else {  //cualquier cosa menos dev
  urlDB = 'mongodb+srv://cesarrivas10:ePPRtrvlkes8DR2u@clustercoffe-nyq5k.mongodb.net/coffe'
}

process.env.urlDB = urlDB;

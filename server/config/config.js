// Aqui se van a declarar variables y constantes de forma global
// =============================================
// Puerto
// =============================================
process.env.PORT = process.env.PORT || 3000;
//la variable del puerto existe, de hecho al hacer un despliegue en heroku este la actualiza
// esta variable no existe localmente, por lo que establecemos que corra en el puerto 3000

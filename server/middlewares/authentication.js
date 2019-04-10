const jwt = require('jsonwebtoken');

// =======================
// Verificacion del token
// Con este middleware se quiere poder leer los headers de las llamadas
let verifyToken = (request, response, next) => {
  //next va a continuar con la ejecucion del programa
  // request porque esta en la peticion .get('nombre del header') para obtener los headers
  let token = request.get('token');

  jwt.verify(token, process.env.SEED_TOKEN, (error, decoded) => {
    if(error) {
      return response.status(401).json({
        ok: false,
        error
      })
    }
    // sino ejecuta el anterior if significa que la informacion es correcta y el
    // decoded va a contener informacion del usuario, es el payload
    // Para hacer que cualquier peticion pueda tener acceso a la informacion del usuario
    // con haber pasado el verifica token
    request.user = decoded.user

    next();
  })
  // response.json({
  //   token: token
  // })
};


module.exports = { verifyToken };

//configurara rutas , puertos , coneccion base de datos
require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
/* parse application/json
app.use = funciona como midelware
*/
app.use(bodyParser.json())

//configuracion global de rutas.-
app.use(require('./routes/index'));
//coneccion a la base de datos
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.URLDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
   },
console.log('BASE DE DATOS ONLINE'));






  app.listen(process.env.PORT , () => console.log('Escuchando el puerto' , process.env.PORT));


  // usuario : jherrrera
  //contraseña : B2l3xVKynMA1Hwzt contraseña mongodb atlas autogenerada
  //URL mongodb atlas en la nube = mongodb+srv://jherrera:B2l3xVKynMA1Hwzt@cluster0-wyroy.mongodb.net/cafe

  // URL de heroku https://rocky-ravine-15729.herokuapp.com
  
  //=================================
  // COMANNDOS HEROKU CONFIGURACIÓN
  //=================================
  /*
  -Establecer la variable de configuracion de heroku
   heroku config
  
   -Establecer una nueva variable de configuración
    heroku config:set "NOMBRE_VARIABLE"
    heroku config:set SEED="este-es-el-seed-produccion"
  
  */
  
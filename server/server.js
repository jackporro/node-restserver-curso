//PUERTO
require('./config/config');

const express = require('express');
const mongoose = require('mongoose');


const app = express();
const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
/* parse application/json
app.use = midelware
*/
app.use(bodyParser.json())

app.use(require('./routes/usuario'));
 
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
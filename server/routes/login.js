const express = require('express');

const Usuario = require('../models/usuario');

const app = express();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.post('/login' ,(req, res) => {

    let body =  req.body;
    
    //findOne = trae solo uno , quiero que el email de la base de datos sea igual al body.email que le estoy enviando
    //primer paramero valido que el email de la base de datos sea igual al email que estoy enviando
    //segundo parametro callback , recibo el error o el usuarioDB(usuario que viene de la base de datos.)
    Usuario.findOne({email : body.email}, (err , usuarioDB) =>{

        if(err){
            return res.status(500).json({
                ok : false,
                err //imprimo el error tal cual viene.
            });
        }

        if(!usuarioDB){
            return res.status(400).json({
                ok : false,
                /*imprimo el error */
                err  : {
                    message : 'El (usuario) o la contraseña con incorrecto'
                }
            });
        }

        //con esta funcion podre comparar las contraseñas para ver si son iguales.
        if(! bcrypt.compareSync(body.password , usuarioDB.password)) {
            return res.status(400).json({
                ok : false,
                 //imprimo el error tal cual viene.
                err : {
                    message : 'El usuario o la (contraseña) con incorrecto'
                }
            });
        }

        //generamos el token utilizando el estandar de jwt "HS256"
        let token =  jwt.sign({usuario : usuarioDB},  process.env.SEED  ,{expiresIn : process.env.CADUCIDAD_TOKEN})
           
        res.json({
                ok : true,
                usuario : usuarioDB,
                token 
            });
        
        

        
    });
    
    
    
       
 });



module.exports = app ;
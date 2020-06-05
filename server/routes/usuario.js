const express = require('express');
const Usuario = require('../models/usuario');
const app = express();
const bcrypt = require('bcrypt');
const  _ = require('underscore');

//app.get('/',  (req, res) => res.json('Hello World'));
app.get('/usuario',(req, res) => {
    
    //parametros opcionales caen en req.query
    let desde = req.query.desde || 0 ;
    desde= Number(desde);

    let limite = req.query.limite || 5;
    limite =Number(limite);

    //aca le digo que campos quiero que aparezcan
    Usuario.find({estado :true} , 'nombre email rol estado google img')
  //  .skip(desde) //Se salta los primeros registros que le mandemos como parametro ej : 5 muestra del 6 en adelante.
   // .limit(limite) //limite de registros quq quiero mostrar en la lista
    .exec((err , usuarios) => {

        if( err ) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        //count , devuelve la cantidad de registors que tengo en mi coleccion.
        Usuario.count({estado : true/*quiero traer solo los con estado false */},(err, conteo) => {
            res.json({
                ok : true,
                usuarios, 
                cuantos :  `La coleccion tiene ${conteo} registros`,
               
    
            })

        })
        
        
    })
}); 

app.post('/usuario',(req, res) => {
    let body = req.body;

    // creamos la instancia de Usuario.
    let usuario = new Usuario({
        nombre : body.nombre,
        email : body.email,
        password : bcrypt.hashSync(body.password, 10), //encriptamos la clave con este paquete de npm bcrypt.
        role : body.role
    });
    
    //grabamos en la base de datos

    usuario.save((err , usuarioDB) =>{
        if( err ) {
            res.status(400).json({
                ok: false,
                err
            });
        }
            usuarioDB.password = null;
            res.json({
                ok: true,
                usuario : usuarioDB
            })   
    });
}); 


app.put('/usuario/:id',(req, res) => {

    let id = req.params.id;
    //con el pick de la libreria underscore podemos decir ke datos kiero actualizar y se los mando en un array
    //google , password no los quiero actualizar por eso no los mando
    let body = _.pick(req.body , ['nombre','email','img','role','estado']);

    Usuario.findByIdAndUpdate(id,body,{ new :true, runValidators :true } , (err , usuarioDB) =>{

        if( err ) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok : true,
            usuario: usuarioDB
        });

    });

}); 


app.delete('/usuario/:id',(req, res) => {

    let id = req.params.id ;
    
    //Borramos usuario de forma logica, cambiamos el estado
    let body = _.pick(req.body , ['estado']);
    body.estado = false;
    Usuario.findByIdAndUpdate(id,body,{ new :true } , (err , usuarioBorradoLogico) =>{

        if( err ) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        if(usuarioBorradoLogico.estado === false){
            res.status(400).json({
                ok: false,
                err : {
                    message :'Ya se borro este registro'
                }
            });
        }
        res.json({
            ok : true,
            usuario: usuarioBorradoLogico,
            mensaje : 'Se borro de forma logica el usuario'
        });

    });


    //Borramos de forma fisica el usuario de la base de datos
   /*Usuario.findByIdAndRemove(id,(err , usuarioBorrado) => {
        if( err ) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        if(!usuarioBorrado){
            res.status(400).json({
                ok: false,
                err : {
                    message :'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok :true ,
            usuario : usuarioBorrado,
            mensaje : `se borro el usuario ${usuarioBorrado}`
        });

    }); */
    
}); 


module.exports = app ;
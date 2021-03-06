
//=============================================
// PUERTO
//=============================================
process.env.PORT = process.env.PORT || 3000;


//=============================================
// ENTORNO
//=============================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev' ;


//=============================================
// VENCIMIENTO DEL TOKEN
//=============================================
//60 segundos
//60 minutos
//24 horas
//30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//=============================================
// SEED de autenticación
//=============================================
 process.env.SEED =process.env.SEED || 'este-es-el-seed-desarrollo';



 //=============================================
// CONECCION BASE DE DATOS
//=============================================

let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB =  ' mongodb://localhost:27017/cafe';
}else{
    urlDB = 'mongodb+srv://jherrera:B2l3xVKynMA1Hwzt@cluster0-wyroy.mongodb.net/cafe';
    }

process.env.URLDB = urlDB;
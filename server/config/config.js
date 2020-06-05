

 /*
  PUERTO, process siempre esta corriendo es parte de node.
 */ 
process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev' ;

let urlDB;
if(process.env.NODE_ENV === 'dev'){
    urlDB =  ' mongodb://localhost:27017/cafe';
}else{
    urlDB = 'mongodb+srv://jherrera:B2l3xVKynMA1Hwzt@cluster0-wyroy.mongodb.net/cafe';
    }

process.env.URLDB = urlDB;
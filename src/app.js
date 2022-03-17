const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors= require('cors');
require('dotenv').config()

let listDomain=['http://dogs-app-client.vercel.app']
let corsOpt={
  origin:function(origin,cb){
    if(listDomain.includes(origin)){
      cb(null,true)
    }else{
      cb(new Error("Not allowed by cors"))
      next()
    }
  },
  optionsSuccessStatus: 200
}

const server = express();
server.name = 'API';
const {NODE_ENV}=process.env
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin','http://dogs-app-client.vercel.app'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE,HEAD');
  next();
});


server.use('/', routes);

server.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

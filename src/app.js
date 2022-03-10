const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors= require('cors');
require('dotenv').config()

let listDomain=['http://localhost:3000']
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

const whitelist = ['*']
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
//server.use(cors(corsOptions))
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Credentials',true);
  res.header("Access-Control-Allow-Headers", 'Content-Type,Authorization,content-type,application/json');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
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

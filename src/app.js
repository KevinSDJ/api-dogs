const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors= require('cors');
const session= require('express-session');
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

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(cors({credentials: true, origin:['https://dogs-app-client.vercel.app']}))
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://dogs-app-client.vercel.app'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.set("trust proxy", 1);
server.use(session({
  name:"uTkn",
  secret:process.env.SECRET_,
  resave:true,
  saveUninitialized:false,
  cookie: {
    maxAge:1000 * 60 * 60 * 2 ,
    sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
    secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
  }
}))

server.use('/', routes);


// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

const express = require('express');
const app = express();
const router = express.Router();
const mongoose =require('mongoose');
const config = require('./config/database');
const path = require('path');

const authentication=require('./routes/authentication')(router);
const blogs= require('./routes/blog')(router);

const bodyparser = require('body-parser');
var cors = require('cors')

mongoose.Promise = global.Promise;
mongoose.connect(config.uri,(err)=>{
  if(err){
    console.log('could not connect to database:',err);
  }else{
    console.log('connected to the database: '+config.db);
  }
});

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use('/authentication', authentication);
app.use('/blogs',blogs);
app.use(express.static(__dirname + '/client/dist/'));


app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
});

app.listen(8080,()=>{
    console.log("Listening on port 8080");
});

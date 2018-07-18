var path = require('path');
var fs = require('fs');
var express = require('express');
var https = require('https');
var morgan = require('morgan');
var url = require('url');
var path = require('path');

var bodyParser = require('body-parser');


var certOptions = {
  key: fs.readFileSync(path.resolve('dist/cert/server.key')),
  cert: fs.readFileSync(path.resolve('dist/cert/server.crt'))
}


// app.get("/",(req,res)=>{
//   res.sendFile(path.join(__dirname,"src",'framed.html'));
// })
// app.use("/wps/PA_PAhorizationStatus/PriorAuthProxy/",express.static('dist'));


var app = express()

// app.use("/",express.static('dist'));

app.use(morgan('combined'));
app.use(express.static('dist'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get("/framed",(req,res)=>{
  res.sendFile(path.join(__dirname,"src",'framed.html'));
})

app.post('*', function(req, res) {
  console.log(req.path);

  res.sendFile(path.join(__dirname, '/dist',  req.path));
});
var server = https.createServer(certOptions, app).listen(8089)


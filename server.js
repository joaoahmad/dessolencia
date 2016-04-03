var https = require('https');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb:146.148.64.75/dessolencia');

var app = express();

app.use(express["static"](__dirname + '/public'));
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

var options = {
    key: fs.readFileSync('/etc/apache2/ssl/apache.key'),
    cert: fs.readFileSync('/etc/apache2/ssl/apache.crt'),
    requestCert: false,
    rejectUnauthorized: false
};


// app.listen(3000);

var server = https.createServer(options, app).listen(3000, function(){
    console.log("server started at port 3000");
});

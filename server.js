var express = require('express');
var app = express();
var root = __dirname;
var path = require('path');

app.use(express.static(root + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

require('./app/routes.js')(app);

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening at http:localhost/3000');
});

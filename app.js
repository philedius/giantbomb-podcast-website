var express = require('express');
var path = require('path');
var app = express();
app.use(express.static('public'));
app.use('/scripts', express.static(__dirname));

app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, ''));

app.get('/', function (req, res) {
 res.render('index');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

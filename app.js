var express = require('express');
var path = require('path');
var app = express();

app.use(express.static('public'));
app.use('/scripts', express.static(__dirname));
app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    var data = require('./giantbomb.json');
    res.render('index', {data: data});
});

app.listen(app.get('port'), function() {
    console.log('Example app listening on port 3000!');
});

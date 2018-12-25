const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');

var app = express();

const index = require('./routes/index');
const digital = require('./routes/digital');
const identity = require('./routes/identity');
const contact = require('./routes/contact');

app.set('views', path.join(__dirname, '/src/views'));
app.engine('hbs', hbs({
  extname: 'hbs',
  helpers: {},
  defaultLayout: 'main',
  layoutsDir: __dirname + '/src/views/layouts',
  partialsDir: __dirname + '/src/views/partials'
}));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/dist/public'));

app.use('/', index);
app.use('/digital', digital);
app.use('/identity', identity);
app.use('/contact', contact);

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log('App running at http://localhost:' + port);
});
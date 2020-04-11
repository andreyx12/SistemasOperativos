const express = require('express')
const path = require('path')
const router = new express.Router()
var hbs = require('express-handlebars');
require('../src/mongoose/mongooseconnection')
const routerList = require('./routers/userrouter')
const productrouter = require('./routers/productrouter')
var bodyParser = require('body-parser')

const app = express()

// Rutas para configuracion de HBS
const publicDirectoryPath = path.join(__dirname, '../public')


app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultLayout: 'main', 
  defaultView: 'default',
  layoutsDir: path.join(__dirname + '/views/layouts/') ,
  partialsDir: path.join(__dirname + '/views/partials/'),
  helpers: {
    if_even: function (conditional, options) {
        if((conditional % 2) == 0) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    }
  },
}));

app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.set('views', path.join(__dirname, 'views'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// view engine setup
app.set('view engine', 'hbs');

// app.use(express.json())
app.use(express.static(publicDirectoryPath))

// Uploaded files
app.use('/uploads', express.static(path.join(__dirname, '/routers/uploads/images')))

// Serve static files from the React app
app.use(express.static(path.join(__dirname + '/../client/build')));

// Router
app.use(routerList)
// Router
app.use(productrouter)

module.exports = app

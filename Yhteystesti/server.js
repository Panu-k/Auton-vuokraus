// Asenna ensin express npm install express
//cccc

var express = require('express');
var app = express();

//CORS
var cors = require('cors')

// Otetaan käyttöön body-parser, jotta voidaan html-requestista käsitellä viestin body post requestia varten... *
var bodyParser = require('body-parser');
// Pyyntöjen reitittämistä varten voidaan käyttää Controllereita
var carController = require('./carController');

var cookieParser = require('cookie-parser')
var session = require('express-session')

const http = require('http');
const url = require('url');
const { Cookie } = require('express-session');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3002;


//CORS middleware

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

// Otetaan käyttöön CORS säännöt:
app.use(allowCrossDomain);


app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}))

//app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //* ...jsonina

app.use(cookieParser());

app.use(session({
    key: "userId",
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 30       
    }

}));

app.use(express.json());
// Staattiset tiedostot, esim. kuvat, tyylitiedostot, scriptit käyttöliittymää varten
app.use(express.static('public'));

app.route('/')
    .get(carController.fetchCars)

app.route('/Types') // route reitittää pyynnön merkkijonon ja metodin perusteella customerControlleriin
    .get(carController.fetchTypes);

app.route('/Car')
    .get(carController.fetchCars)
    .post(carController.createCars);

app.route('/Newcars')
    .get(carController.fetchNewestCars)

app.route('/Car/:id')
    .put(carController.update)
    .delete(carController.deleteCar)
    .get(carController.fetchOneCar);

app.route('/Customer')
    .get(carController.fetchCustomers)
    .post(carController.createCustomers);

app.route('/Customer/nimi')
    .get(carController.fetchOneCustomer2)

app.route('/Customer/:id')
    .delete(carController.deleteCustomer)
    .get(carController.fetchOneCustomer);

app.route('/login')
    .post(carController.login)
    .get(carController.loginget)

app.route('/logout')
    .get(carController.logout)

app.route('/booking')
    .post(carController.createbooking)
    .get(carController.getbooking)

app.route('/cardates/:id')
    .get(carController.fetchcardates)

app.route('/email')
    .post(carController.sendemail)    

app.listen(port, hostname, () => {
    console.log(`Server running AT http://${hostname}:${port}/`);
});

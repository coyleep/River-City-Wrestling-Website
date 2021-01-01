if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');


// Connect Mongoose
var MongoClient = require('mongodb').MongoClient;


// view engine setup 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//setup public folder
app.use(express.static('./public'));

// EJS
app.use(expressLayouts);
app.use(express.json())

// CORS
app.use(cors());

// Bodyparser
app.use(express.urlencoded({ extended: true }));


// Routes 
app.use('/users', require('./public/routes/users'));
app.use('/calendar', require('./public/routes/calendar'));


//*************************
// GET ROUTES
//*************************

// Homepage
app.get('/', (req, res) => res.render('index'));

// Coaches page
app.get('/coaches', (req, res) => res.render('coaches'));

// Covid Page
app.get('/covid', (req, res) => res.render('covid'));

// Location Page
app.get('/location', (req, res) => res.render('location'));

// Results Page
app.get('/results', (req, res) => res.render('results'));

// Questions/Comments page
app.get('/questions', (req, res) => res.render('questions'));

//*************************
// POST ROUTES
//*************************
app.post('/purchase', (req, res) => {
    total = req.body.items 
    names = req.body.name
    stripe.charges.create({
        amount: total,
        source: req.body.stripeTokenID,
        currency: 'usd',
        name: names
    }).then(function() {
        console.log('charge Successful')
        res.json({message: 'successfully purchased items'});
    }).catch(function() {
        console.log('charge failed')
        res.status(500).end()
    })
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  })


const PORT = process.env.PORT || 3000

app.listen(PORT,() =>{
    console.log(`App is listening on ${PORT}`);
})
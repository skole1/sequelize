const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');

//global db
global.db = db;

//Test Db
db.authenticate()
    .then(()=> console.log('Database connected...'))
    .catch((err)=> console.log('Error: ' + err))

const app = express();

//Middleware For Handlebars
app.engine('handlebars',  exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Index Routes
app.get('/', (req, res)=>{
    res.render('pages/index', {
        layout:'landing'
    });
});

//Gig Routes
app.use('/gigs', require('./routes/gigs'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 2022;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

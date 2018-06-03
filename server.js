/*const db = require('./db').init()
    .then((db)=>{

    });
const data = require('./data').init(db);
const app = require('./app').init(data);

app.liste(4343, () => console.log('server started at port 4343'));

*/
const morgan = require('morgan');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// get the mode
const model = require('./models/team');
// require the db
const mongoose = require('mongoose');

//connect to the db
const config = require('./config/db');

mongoose.connect(config.database);
let db = mongoose.connection;

db.once('open', function(){
    console.log('connected to the db')
});

// get the team model
let Team = require('./models/team');


//config middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/static',
        express.static(
            path.join(__dirname, '/static'))
    );


// home page
app.set('view engine', 'pug');

app.get('/', (req, res)=>{
    res.render('home');
});

app.get('/teams', (req, res)=>{
    Team.find({}, function(err, teams){
        if(err){
            console.log(err);
        }
        else{
            res.render('teams',{
                title: "Gaaaa",
                teams: teams,
            }
        );
            
        }
    })
});

app.get('/teams/add', (req,res)=>{
    res.render('addteam');
});

// adding the post form the team form

app.post('/teams/add', (req,res)=>{
    let team = new Team();
    // fetch from the client body and save it to the db
    team.title = req.body.title;
    team.coach = req.body.coach;
    team.continent = req.body.continent;

    // save the fetched data to the db
    team.save(function(err){
        if(err){
            console.log(err);
        }
        // on success redirect me to the home page
        else{
            res.redirect('/teams')
        }
    });
});

app.get('/argI', (req, res)=>{
    res.render('news/argI');
});

app.get('/lord', (req, res)=>{
    res.render('news/lord');
});

app.get('/favourites', (req,res)=>{
    res.render('news/favourites');
});

app.get('/grstage', (req,res)=>{
    res.render('news/grstage');
});


app.listen(4343, ()=>{
    console.log('server is running on port 4343'); 
});

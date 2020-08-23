const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// Get gig list
router.get('/', (req, res) => 
  Gig.findAll({raw: true})
    .then(gigs => res.render('pages/gigs', {
        gigs
      }))
    .catch(err => console.log(err)));

//Display Add Form
router.get('/add', (req, res)=>{
    res.render('pages/add')
});

//Add a gig
router.post('/add', (req, res) =>{
    let { title, technologies, budget, description, contact_email } = req.body;
    let errors = [];

    //Validate fields
    if(!title){
        errors.push({text: 'Please add a title'});
    }
    if(!technologies){
        errors.push({text: 'Please add some technologies'});
    }
    if(!budget){
        errors.push({text: 'Please add a title'});
    }
    if(!description){
        errors.push({text: 'Please add a description'});
    }
    if(!contact_email){
        errors.push({text: 'Please add a contact email'});
    }

    if(errors.length > 0){
        res.render('pages/add', {
            errors,
            title, 
            technologies, 
            budget, 
            description,
            contact_email
        });
    }else{
        if(!budget){
            budget = "Unknown";
        }else{
            budget = `$${budget}`;
        }

        //Make a lower case and remove space after comma
        technologies = technologies.toLowerCase().replace(/, /g, ',');

        //Insert into Table
        Gig.create({
            title,
            technologies,
            budget,
            description,
            contact_email
        })
        .then(gigs => res.redirect('/gigs'))
        .catch(err => console.log(err))
        }  
});

//Search for gigs
router.get('/search', (req, res)=>{
    let { term } = req.query;

    //Make lower case
    term = term.toLowerCase();

    Gig.findAll({ raw: true, where: { technologies: { [Op.like]: '%' + term + '%' } } })
        .then(gigs => res.render('pages/gigs', { gigs }))
        .catch(err => console.log(err))
});

module.exports = router;
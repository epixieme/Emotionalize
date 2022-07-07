const { application } = require('express');
const express = require('express')
const router = express.Router();//router level middleware - Route handlers enable you to define multiple routes for a path rather than just using eg get

// see about different ways of routing https://expressjs.com/en/guide/using-middleware.html

const emotionsController = require('../controllers/emotionsController'); //import the emotions controller
/*  
* App Routes
*/

router.get('/', emotionsController.homepage); //create the route
router.get('/categories', emotionsController.exploreCategories);
router.get('/emotion/:id', emotionsController.exploreEmotion) //creating the route to get a more detailed view of each emotion when you click on it

module.exports = router
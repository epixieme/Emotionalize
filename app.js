const express = require('express');
const expressLayouts = require('express-ejs-layouts'); //prevents us having to duplicate code in ejs
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.urlencoded({ extended:true })); // helps us pass url data to ejs
app.use(express.static('public'));// hosts public fiels like html and css or main.js
app.use(expressLayouts);
app.set('layout', './layouts/main' );
app.set('view engine','ejs')

const routes = require('./server/routes/emotionsRoutes.js');
app.use('/',routes);
app.listen(port, ()=>console.log(`listening to port $`))

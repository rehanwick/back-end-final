
require( 'dotenv' ).config();
const express = require('express');
const { connect } = require( './db/init' );
const cors = require('cors') ; 
const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended:true})) ; 
app.use(cors()) ; 
app.use( express.json() );

app.use('/auth' , require('./routes/auth.routes'));
app.use('/' , require('./routes/index.routes') ) ; 
app.use('/problems' , require('./routes/problems.routers') );

app.use( require( './middlewear/errors' ).resourceNotFound );
app.use( require( './middlewear/errors' ).errorHandler );

connect()
    .then(() => {
        app.listen( PORT, () => {
            console.log( `server started on - http://localhost:${PORT}` );
        });
    })
    .catch(error => {
        process.exit( 1 );
    });
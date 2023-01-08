const express = require( 'express' );
const UserCtrl = require('../controllers/index.controllers')



const router = express.Router();
router.get( '/', UserCtrl.getIndex);
router.get('/profile/:email' , UserCtrl.getUserByEmail  ) ; 



module.exports = router;
const express = require( 'express' );
const UserCtrl = require('../controllers/index.controllers')



const router = express.Router();
router.get( '/score', UserCtrl.getIndex);
router.get('/profile/:email' , UserCtrl.getUserByEmail  ) ; 



module.exports = router;
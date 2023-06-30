const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/auth.js');
const passport = require('passport');
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/index.html'));
  });// log in main 

router.get('/auth',passport.authenticate('github',{ scope: [ 'user:email' ] }));// get authenticated by 
router.get('/auth/error', (req, res) => res.send('Unknown Error'));// if error

//return callback route
router.get('/oauth-callback',passport.authenticate('github', { failureRedirect: '/auth/error' }),
function(req, res) {
  res.redirect('/api-docs');
});

router.use("/jobs", isLoggedIn, require("./jobs"));
router.use("/recruiters", isLoggedIn, require("./recruiters.js"));
router.use("/users", isLoggedIn, require("./users.js"));
// router.use("/applications", isLoggedIn, require("./applications.js"));

router.use('/', isLoggedIn,require('./swagger'));

module.exports = router;
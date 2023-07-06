const express = require('express');
const router = express.Router();
const passport = require('../middleware/passport-config');
const authRouter = require('./auth');
session = require('express-session');

// Authentication Routes

router.use(require("express-session")({
    secret: "your-secret-key",
    resave: true,
    saveUninitialized: true
}));

// Initialize Passport
router.use(passport.initialize());
router.use(passport.session());


// Other Routes
router.use("/jobs", require("./jobs"));
router.use("/recruiters", require("./recruiters.js"));
router.use("/users", require("./users.js"));

// Swagger Routes with authentication middleware
router.use("/", require("./swagger"));

router.use('/', authRouter);

module.exports = router;



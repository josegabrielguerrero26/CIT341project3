// passport-config.js
const passport = require('passport');
const dotenv = require('dotenv');
const passportGoogle = require('passport-google-oauth20');

dotenv.config();

/* Create The Google Strategy */
const GoogleStrategy = passportGoogle.Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
    },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        })
);

module.exports = passport;



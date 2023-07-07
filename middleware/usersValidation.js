//Validate USERS
const validator = require('../helper/validate');

const saveUser = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    birthday: 'string',
    email: 'required|email',
    password: 'required|string|min:6|confirmed|strict',
    city: 'required|string',
    major: 'required|string',
    skill: 'required|string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};



module.exports = {
  saveUser,
};

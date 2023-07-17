const validator = require('../helper/validate');

const saveRecruiter = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    position: 'required|string',
    company: 'required|string',
    salary: 'numeric',
    recruiter: 'required|string',
    phone: 'required|string',
    skills: 'string'
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
  saveRecruiter,
};
const validator = require("../helper/validate");

const saveJob = (req, res, next) => {
  const validationRule = {
    title: "required|string",
    position: "required|string",
    company: "required|string",
    location: "required|string",
    description: "required|string",
    requirements: "array",
    salary: {
      currency: "required|string",
      amount: "required|numeric",
    },
    skills: "array",
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveJob,
};

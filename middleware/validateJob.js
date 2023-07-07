const validator = require("../helper/validate");

const saveJob = (req, res, next) => {
  const validationRule = {
    title: "required|string",
    position: "required|string",
    company: "required|string",
    location: "required|string",
    description: "required|string",
    requirements: "string",
    salary: "required|string",
    skills: "string",
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

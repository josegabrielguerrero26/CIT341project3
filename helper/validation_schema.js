/*const Validator = require('validatorjs');
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;

Validator.register('strict', value => passwordRegex.test(value),'password must contain at least one uppercase letter, one lowercase letter and one number');

const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};module.exports = validator;*/
const Joi = require('@hapi/joi')

const validateJob = Joi.object({
  title: Joi.string().min(4).required(),
  position: Joi.string().min(4).required(),
  company: Joi.string().min(4).required(),
  location: Joi.string().min(4).required(),
  description: Joi.string().min(4).required(),
  requirements: Joi.string().min(4).required(),
  salary: Joi.number().required(),
  skill: Joi.string().min(4).required()
})

const validateUser = Joi.object({
  firstName: Joi.string().min(4).required(),
  lastName: Joi.string().min(4).required(),
  birthday: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string()
  .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
  .required()
  .messages({
    "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
    "string.empty": `Password cannot be empty`,
    "any.required": `Password is required`,
  }),
  city: Joi.string().min(4).required(),
  major: Joi.string().min(4).required(),
  skill: Joi.string().min(4).required(),
})

const validateRecruiter = Joi.object({
  first_name: Joi.string().min(4).required(),
  last_name: Joi.string().min(4).required(),
  birthday: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  company: Joi.string().min(4).required(),
  phone: Joi.number().integer().min(10).required()
})
const validateapp = Joi.object({
  first_name: Joi.string().min(4).required(),
  last_name: Joi.string().min(4).required(),
  salary: Joi.number().required()

})

module.exports = {
  validateJob,
  validateRecruiter,
  validateUser,
  validateapp
}

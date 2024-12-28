const Joi = require('joi');

module.exports.listingSchema = Joi.object({
  listing : Joi.object().required({
    personName:Joi.string().required(),
    address:Joi.string().required(),
    phoneNumber:Joi.number().required(),
    complaintName:Joi.string().required(),
    description:Joi.string().required(),
    dateOccurred:Joi.date().required(),
  }).required()
})

module.exports.reportSchema = Joi.object({
  report : Joi.object().required({
    fullName:Joi.string().required(),
    address:Joi.string().required(),
    contactNumber:Joi.number().required(),
    email:Joi.string().required(),
    subject:Joi.string().required(),
    description:Joi.string().required(),
    rating:Joi.number()
              .min(1)
              .max(5)
              .required(),
  }).required()
})
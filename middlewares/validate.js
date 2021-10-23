const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  const validations = {};

  if (error) {
    error.details.forEach((element) => {
      validations[element.context.label] = element.message;
    });

    return res
      .status(400)
      .json({ status: false, message: 'Validation failure!', validations });
  }
  return next();
};

module.exports = validate;

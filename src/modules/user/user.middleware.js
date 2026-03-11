import Joi from "joi";

const validateUser = (req, res, next) => {
  try {
    const payload = req.body;

    const schema = Joi.object({
      number: Joi.number().required(),
      string: Joi.string().required(),
      bool: Joi.boolean().required(),
    });

    const { error } = schema.validate(payload);

    if (!error) {
      next();
    } else {
      return res.status(400).json({
        status: "error",
        message: "Invalid payload",
        error: error.details,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

export default validateUser;

//SCHEMA
import Joi from "joi";

export const userSchema = Joi.object({
  number: Joi.number().required(),
  string: Joi.string().required(),
  bool: Joi.boolean().required(),
  array: Joi.array(),
});


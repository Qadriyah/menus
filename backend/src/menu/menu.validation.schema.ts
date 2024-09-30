import * as Joi from 'joi';

export const CreateMenuValidationSchema = Joi.object({
  name: Joi.string().required(),
  depth: Joi.number().required(),
  parent: Joi.number()
    .required()
    .allow(...[null]),
}).options({
  abortEarly: false,
});

export const UpdateMenuValidationSchema = Joi.object({
  name: Joi.string(),
  depth: Joi.number(),
  parent: Joi.number().allow(...[null]),
}).options({
  abortEarly: false,
});

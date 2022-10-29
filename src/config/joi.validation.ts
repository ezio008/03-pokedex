import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.required(),
  PORT: Joi.number().default(3000),
  DEFAULT_LIMIT: Joi.number().default(10),
  HOST_API: Joi.required(),
  JWT_SECRET: Joi.required(),
  MAIL_HOST: Joi.required(),
  MAIL_USER: Joi.required(),
  MAIL_PASSWORD: Joi.required(),
  MAIL_FROM: Joi.required(),
  MAIL_TRANSPORT: Joi.required(),
  MAIL_PORT: Joi.required().default(465),
});

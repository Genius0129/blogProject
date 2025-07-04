import Joi from 'joi';

export const validateInput = (schema, data) => {
  const { error } = schema.validate(data);
  if (error) {
    return { success: false, message: error.details[0].message };
  }
  return { success: true };
};

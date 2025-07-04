import Joi from 'joi';

const commentSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must not exceed 50 characters',
    'any.required': 'Name is required'
  }),
  message: Joi.string().min(5).max(500).required().messages({
    'string.base': 'Message must be a string',
    'string.min': 'Message must be at least 5 characters long',
    'string.max': 'Message must not exceed 500 characters',
    'any.required': 'Message is required'
  }),
});

export default commentSchema;

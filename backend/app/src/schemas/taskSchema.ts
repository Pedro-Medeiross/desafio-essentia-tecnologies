import Joi from 'joi';

export const createTaskSchema = Joi.object(
    {
        name: Joi.string().min(3).required(),
        completed: Joi.boolean().optional(),
    }
)

export const updateTaskSchema = Joi.object(
    {
        name: Joi.string().min(3).optional(),
        completed: Joi.boolean().optional(),
    }
)

import Joi from 'joi';

// Esquema de validação para criar uma nova tarefa
export const createTaskSchema = Joi.object({
    name: Joi.string().min(3).required(), // O nome da tarefa deve ser uma string com no mínimo 3 caracteres e é obrigatório
    completed: Joi.boolean().optional(),  // O status 'completed' é opcional e deve ser um booleano
});

// Esquema de validação para atualizar uma tarefa existente
export const updateTaskSchema = Joi.object({
    name: Joi.string().min(3).optional(), // O nome da tarefa deve ser uma string com no mínimo 3 caracteres, mas é opcional
    completed: Joi.boolean().optional(),  // O status 'completed' é opcional e deve ser um booleano
});
import Task from '../models/taskModel';
import { createTaskSchema } from '../schemas/taskSchema';
import { Request, Response } from 'express';

export const createTask = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Valida o corpo da requisição com o schema do Joi
        const { error } = createTaskSchema.validate(req.body);
        if (error) {
            // Retorna o erro de validação
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, completed } = req.body;

        // Cria uma nova tarefa no banco de dados
        const newTask = await Task.create({
            name,
            completed: completed || false, // Define como falso se não estiver presente
        });

        // Retorna sucesso com a nova tarefa criada
        return res.status(201).json({ message: 'Tarefa criada com sucesso.', newTask });
    } catch (err) {
        // Retorna um erro genérico, mas mantém detalhes no log (se houver)
        console.error('Erro ao criar tarefa:', err);
        return res.status(500).json({ error: 'Erro ao criar tarefa.' });
    }
};
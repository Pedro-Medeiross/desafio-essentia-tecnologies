import Task from '../models/taskModel';
import { createTaskSchema, updateTaskSchema } from '../schemas/taskSchema';
import { Request, Response } from 'express';

// Função para criar uma nova tarefa
export const createTask = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Valida o corpo da requisição com o schema do Joi
        const { error } = createTaskSchema.validate(req.body);
        if (error) {
            // Retorna um erro de validação se os dados estiverem incorretos
            return res.status(400).json({ error: error.details[0].message });
        }

        // Desestrutura o corpo da requisição para extrair os parâmetros
        const { name, completed } = req.body;

        // Cria uma nova tarefa no banco de dados
        const newTask = await Task.create({
            name,
            completed: completed || false, // Define como falso se o status 'completed' não for fornecido
        });

        // Retorna uma resposta de sucesso com a nova tarefa criada
        return res.status(201).json({ message: 'Tarefa criada com sucesso.', newTask });
    } catch (err) {
        // Retorna um erro genérico e registra o erro no console
        console.error('Erro ao criar tarefa:', err);
        return res.status(500).json({ error: 'Erro ao criar tarefa.' });
    }
};

// Função para deletar uma tarefa existente
export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Desestrutura o corpo da requisição para extrair o ID
        const { id } = req.body;

        // Tenta encontrar a tarefa pelo ID
        const task = await Task.findByPk(id);
        if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });

        // Deleta a tarefa do banco de dados
        await task.destroy();

        // Retorna uma resposta de sucesso se a tarefa for deletada corretamente
        return res.status(200).json({ message: 'Tarefa deletada com sucesso.' });
    } catch (err) {
        // Retorna um erro caso não seja possível deletar a tarefa
        console.error('Erro ao deletar tarefa:', err);
        return res.status(500).json({ error: 'Erro ao deletar tarefa.' });
    }
};

// Função para atualizar uma tarefa existente
export const updateTask = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Valida o corpo da requisição com o schema do Joi
        const { error } = updateTaskSchema.validate(req.body);
        if (error) {
            // Retorna um erro de validação se os dados estiverem incorretos
            return res.status(400).json({ error: error.details[0].message });
        }
        // Desestrutura o corpo da requisição para extrair os parâmetros
        const { id, name, completed } = req.body;

        // Tenta encontrar a tarefa pelo ID
        const task = await Task.findByPk(id);
        if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });

        // Atualiza a tarefa no banco de dados com os novos valores
        await task.update({ name, completed });

        // Retorna uma resposta de sucesso se a tarefa for atualizada corretamente
        return res.status(200).json({ message: 'Tarefa atualizada com sucesso.', task });
    } catch (err) {
        // Retorna um erro caso não seja possível atualizar a tarefa
        console.error('Erro ao atualizar tarefa:', err);
        return res.status(500).json({ error: 'Erro ao atualizar tarefa.' });
    }
};
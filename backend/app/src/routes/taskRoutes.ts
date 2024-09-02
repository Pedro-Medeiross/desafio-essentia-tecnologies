import { Router } from 'express';
import { createTask, updateTask, deleteTask } from '../crud/taskCrud';

// Define o router que será usado para criar as rotas
const router = Router();

// Define as rotas no router para serem usadas no arquivo principal
router.post('/create', createTask); // Rota para criar uma nova tarefa
router.post('/update', updateTask); // Rota para atualizar uma tarefa existente
router.post('/delete', deleteTask); // Rota para deletar uma tarefa

// Exporta o router para que possa ser utilizado em outras partes da aplicação
export default router;
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';

// Interface que define os atributos da entidade Task
interface TaskAttributes {
    id: number; // ID da tarefa (chave primária)
    name: string; // Nome da tarefa
    completed: boolean; // Status de conclusão da tarefa
}

// Interface que permite que o campo 'id' seja opcional durante a criação de uma nova tarefa
interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

// Definição do modelo Task, que implementa os atributos da interface TaskAttributes
class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
    public id! : number; // ID da tarefa
    public name! : string; // Nome da tarefa
    public completed! : boolean; // Status de conclusão da tarefa
}

// Inicializa o modelo Task e define seus campos e configurações
Task.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED, // Define o ID como um inteiro não assinado
        autoIncrement: true, // ID será incrementado automaticamente
        primaryKey: true, // Define o ID como chave primária
      },
      name: {
        type: DataTypes.STRING(100), // Nome da tarefa como string com até 100 caracteres
        allowNull: false, // O campo 'name' é obrigatório
      },
      completed: {
        type: DataTypes.BOOLEAN, // Status de conclusão como booleano
        allowNull: true, // O campo 'completed' é opcional
      },
    },
    {
        sequelize, // Instância de conexão Sequelize
        tableName: 'tasks', // Nome da tabela no banco de dados
    }
);

// Exporta o modelo Task para ser utilizado em outras partes da aplicação
export default Task;
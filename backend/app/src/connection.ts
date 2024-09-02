import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Define as constantes para as credenciais do banco de dados, usando variáveis de ambiente
const database_name = process.env.DATABASE_NAME || ''; // Nome do banco de dados
const username = process.env.USERNAME || ''; // Nome de usuário do banco de dados
const password = process.env.PASSWORD || ''; // Senha do banco de dados
const host = process.env.HOST || 'localhost'; // Host do banco de dados (padrão é 'localhost')

// Inicializa uma instância do Sequelize, configurando a conexão com o banco de dados MySQL
const sequelize = new Sequelize(database_name, username, password, {
  host: host, // Especifica o host
  dialect: 'mysql', // Define o dialeto como MySQL
  logging: false, // Desativa o log de consultas SQL no console
});

// Exporta a instância do Sequelize para ser usada em outras partes da aplicação
export default sequelize;
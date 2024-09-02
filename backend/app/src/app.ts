import express from 'express';
import dotenv from 'dotenv';
import sequelize from './connection';
import taskRoutes from './routes/taskRoutes';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config()

// Cria o objeto do Express
const app = express()

// Middleware para permitir que a aplicação parseie JSON no corpo das requisições
app.use(express.json());

// Define a rota '/task' para usar as rotas definidas em taskRoutes
app.use('/task', taskRoutes)

// Teste de conexão com o banco de dados
sequelize
    .authenticate() // Tenta autenticar a conexão com o banco de dados
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch((err) => {
        console.error('Não foi possível conectar ao banco de dados:', err); // Loga um erro se a conexão falhar
    });

// Sincronização dos modelos com o banco de dados
sequelize
    .sync({ alter: true }) // Sincroniza todos os modelos com o banco de dados, alterando a tabela existente, se necessário
    .then(() => {
        console.log('Modelos sincronizados com o banco de dados.');
    })
    .catch((err) => {
        console.error('Erro ao sincronizar modelos com o banco de dados:', err); // Loga um erro se a sincronização falhar
    });

// Define a porta na qual o servidor vai rodar, usando a porta especificada em .env ou 3000 como padrão
const PORT = process.env.PORT || 3000;

// Inicia o servidor e faz com que ele escute na porta especificada
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
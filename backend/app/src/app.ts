import express from 'express';
import dotenv from 'dotenv';
import sequelize from './connection';
import taskRoutes from './routes/taskRoutes';

dotenv.config()

const app = express()

app.use(express.json());

app.use('/task', taskRoutes)

// Teste de conexão com o banco de dados
sequelize
    .authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch((err) => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });

// Sincronização dos modelos com o banco de dados
sequelize
    .sync({ alter: true })
    .then(() => {
        console.log('Modelos sincronizados com o banco de dados.');
    })
    .catch((err) => {
        console.error('Erro ao sincronizar modelos com o banco de dados:', err);
    });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
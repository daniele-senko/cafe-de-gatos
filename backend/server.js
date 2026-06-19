import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const app = express();

// configuração do CORS para permitir requisições do frontend
app.use(cors());

// permite que o Express entenda requisições com corpo em JSON
app.use(express.json());

// monta as rotas de autenticação
app.use('/api/auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

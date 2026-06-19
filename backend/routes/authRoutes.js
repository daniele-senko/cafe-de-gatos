import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// rota para validar o token e retornar os dados do usuário autenticado
router.post('/validate', verifyToken, (req, res) => {
    // se chegou até aqui, o middleware (verifyToken) validou o token com sucesso
    // retornamos os dados extraídos do token para confirmar a autenticação
    res.status(200).json({
        message: 'Token válido',
        user: req.user
    });
});

export default router;

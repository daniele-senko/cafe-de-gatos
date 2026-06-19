import { auth } from '../firebaseAdmin.js';

// centralizei essa validação em um middleware para poder reutilizá-la em outras rotas protegidas futuramente.
export const verifyToken = async (req, res, next) => {
    // verificamos se o cabeçalho authorization foi enviado corretamente
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token ausente ou mal formatado' });
    }

    // extraio o token enviado pelo frontend através do cabeçalho authorization.
    const token = req.headers.authorization.split(' ')[1];

    if (!auth) {
        return res.status(500).json({ error: 'Serviço de autenticação não configurado no backend.' });
    }

    try {
        const decodedToken = await auth.verifyIdToken(token);
        
        // adiciona os dados do usuário na requisição para que as rotas possam utilizá-los
        req.user = decodedToken;
        
        // passa para o próximo middleware ou para a rota final
        next();
    } catch (error) {
        console.error('Erro ao validar token:', error);
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
};

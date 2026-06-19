import { ref } from 'vue';
import { defineStore } from 'pinia';
import { auth, provider } from '../firebase';
import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
    const usuarioLogado = ref<User | null>(null);

    // Aqui eu uso o onAuthStateChanged para monitorar o estado de autenticação em tempo real, 
    // assim qualquer mudança no Firebase reflete imediatamente na nossa variável reativa.
    onAuthStateChanged(auth, (user) => {
        usuarioLogado.value = user;
    });

    async function loginComGoogle(): Promise<void> {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
            const token = await user.getIdToken();
            
            // envio o token para o backend através do cabeçalho authorization.
            const response = await fetch('http://localhost:3000/api/auth/validate', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Falha na validação do token no backend');
            }

            console.log('Token validado com sucesso no backend!');
        } catch (error) {
            console.error('Erro ao fazer login: ', error);
            throw error;
        }
    }

    async function logout(): Promise<void> {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Erro ao fazer logout: ', error);
            throw error;
        }
    }

    return { usuarioLogado, loginComGoogle, logout };
});
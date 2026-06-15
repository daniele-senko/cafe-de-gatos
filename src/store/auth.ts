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
            await signInWithPopup(auth, provider);
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
// importamos as funções de roteamento do vue router
import { createRouter, createWebHistory } from 'vue-router'

// importamos os componentes que representam as páginas da nossa aplicação
import Home from '../pages/Home.vue'
import Lista from '../pages/Lista.vue'
import Cadastro from '../pages/Cadastro.vue'
import Sobre from '../pages/Sobre.vue'

// definição das rotas: mapeamento entre a URL (path) e o componente visual
const routes = [
    { path: '/', component: Home },
    { path: '/lista', component: Lista },
    
    // essa rota atende 2 propositos: criar e editar
    // o parametro :id é opcional, por isso, criei duas definições de path apontando para o mesmo componente
    { path: '/cadastro', component: Cadastro },
    { path: '/cadastro/:id', component: Cadastro },
    { path: '/sobre', component: Sobre }
]

// instanciamos o roteador utilizando o histórico padrão do navegador
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
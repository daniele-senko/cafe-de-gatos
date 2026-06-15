import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth";

// Aqui eu importo as páginas do sistema
import Home from "../pages/Home.vue";
import Lista from "../pages/Lista.vue";
import Cadastro from "../pages/Cadastro.vue";
import Sobre from "../pages/Sobre.vue";
import Login from "../pages/Login.vue";

const routes = [
  { path: "/login", component: Login },
  { path: "/", component: Home, meta: { requerAuth: true } },
  { path: "/lista", component: Lista, meta: { requerAuth: true } },
  { path: "/cadastro/:id?", component: Cadastro, meta: { requerAuth: true } },
  { path: "/sobre", component: Sobre, meta: { requerAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Criei este guarda global de rotas para interceptar qualquer mudança de rota no sistema. 
// Ele verifica se a rota de destino exige autenticação através da propriedade 'meta.requerAuth'
router.beforeEach((to, from, next) => {
  const rotaExigeAutenticacao = to.matched.some(
    (record) => record.meta.requerAuth,
  );
  const authStore = useAuthStore();
  const estaAutenticado = authStore.usuarioLogado !== null;

  // Se a rota exigir login e o usuário não estiver autenticado, eu barro o acesso e redireciono para o login
  if (rotaExigeAutenticacao && !estaAutenticado) {
    next("/login");
  } else {
    // Caso contrário, eu permito o fluxo de navegação normal
    next();
  }
});

export default router;

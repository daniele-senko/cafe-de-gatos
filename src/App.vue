<template>
  <v-app>
    <v-app-bar color="primary" prominent elevation="4">
      <v-icon class="ml-4" size="large">mdi-cat</v-icon>

      <v-app-bar-title class="pixel-font mt-1 ml-2">
        café de gatos
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn
        to="/"
        variant="text"
        class="pixel-font text-caption"
        prepend-icon="mdi-paw"
        >home</v-btn
      >
      <v-btn
        to="/lista"
        variant="text"
        class="pixel-font text-caption"
        prepend-icon="mdi-paw"
        >lista</v-btn
      >
      <v-btn
        to="/cadastro"
        variant="text"
        class="pixel-font text-caption"
        prepend-icon="mdi-paw"
        >cadastro</v-btn
      >
      <v-btn
        to="/sobre"
        variant="text"
        class="pixel-font text-caption"
        prepend-icon="mdi-paw"
        >sobre</v-btn
      >

      <v-divider vertical class="mx-2 my-3" color="white"></v-divider>

      <div v-if="authStore.usuarioLogado" class="d-flex align-center ml-2 mr-2">
        <v-avatar size="32" class="mr-2">
          <v-img
            :src="authStore.usuarioLogado.photoURL ?? ''"
            alt="foto do usuário"
          ></v-img>
        </v-avatar>
        <span class="text-caption font-weight-bold mr-2 text-white">{{
          authStore.usuarioLogado.displayName
        }}</span>
        <v-btn
          variant="outlined"
          size="small"
          color="white"
          class="pixel-font text-caption"
          @click="executarLogout"
        >
          sair
        </v-btn>
      </div>

      <v-btn
        v-else
        variant="elevated"
        color="secondary"
        class="pixel-font text-caption ml-2 mr-2"
        @click="executarLogin"
      >
        login
      </v-btn>

      <v-icon class="mr-4" size="large">mdi-paw</v-icon>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
// Aqui eu importo a store global do Pinia com nossos métodos de autenticação do Firebase
import { useAuthStore } from "./store/auth";

const router = useRouter();
const authStore = useAuthStore();

// Eu criei este método para aguardar a promessa de login do Google e redirecionar para a Home após o sucesso
async function executarLogin() {
  try {
    await authStore.loginComGoogle();
    router.push("/");
  } catch (error) {
    console.error("erro ao realizar login pela navbar:", error);
  }
}

// Aqui eu implementei o logout que desconecta o usuário e o devolve para a tela de login protegida
async function executarLogout() {
  try {
    await authStore.logout();
    router.push("/login");
  } catch (error) {
    console.error("erro ao realizar logout pela navbar:", error);
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

.pixel-font {
  font-family: "Press Start 2P", monospace !important;
}

h1,
.v-card-title,
.v-btn__content {
  font-family: "Press Start 2P", monospace !important;
}

h1 {
  font-size: 1.5rem !important;
  line-height: 2 !important;
}

.v-card-title {
  font-size: 1.1rem !important;
}
</style>

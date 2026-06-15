<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card
      class="mx-auto pa-6 text-center"
      max-width="400"
      elevation="4"
      color="surface"
    >
      <v-card-item class="justify-center">
        <v-icon size="80" color="primary" class="mb-4">mdi-cat</v-icon>
      </v-card-item>

      <v-card-title
        class="text-h5 font-weight-bold text-primary mb-2 pixel-font"
      >
        café de gatos
      </v-card-title>

      <v-card-subtitle class="text-body-2 mb-6">
        área de administração felina
      </v-card-subtitle>

      <v-card-text>
        <p class="text-body-2 text-grey-darken-1 mb-6">
          para acessar o gerenciamento de residentes e o painel de controle do
          café, faça login com sua conta google.
        </p>

        <v-btn
          color="secondary"
          size="large"
          block
          class="text-caption pixel-font text-white"
          prepend-icon="mdi-google"
          variant="flat"
          @click="executarLogin"
        >
          entrar com o google
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import { onMounted } from "vue";

const router = useRouter();
const authStore = useAuthStore();

// Eu adicionei esta checagem de ciclo de vida: se o usuário já estiver autenticado e tentar acessar a tela de login, 
// eu o redireciono automaticamente para a página inicial, evitando redundância.
onMounted(() => {
  if (authStore.usuarioLogado) {
    router.push("/");
  }
});

// Eu criei este método assíncrono para tratar a promessa de login do provedor Google.
async function executarLogin() {
  try {
    await authStore.loginComGoogle();
    // Após a validação bem-sucedida no Firebase, eu redireciono o usuário para a Home
    router.push("/");
  } catch (error) {
    console.error("erro ao realizar autenticação na tela de login:", error);
  }
}
</script>

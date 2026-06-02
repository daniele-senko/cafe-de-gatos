<template>
  <v-app>
    <v-app-bar color="primary" prominent elevation="4">
      <v-icon class="ml-4" size="large">mdi-cat</v-icon>

      <v-app-bar-title class="pixel-font mt-1 ml-2">
        Café de Gatos
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn to="/" variant="text" class="pixel-font text-caption" prepend-icon="mdi-paw">Home</v-btn>
      <v-btn to="/lista" variant="text" class="pixel-font text-caption" prepend-icon="mdi-paw">Lista</v-btn>
      <v-btn to="/cadastro" variant="text" class="pixel-font text-caption" prepend-icon="mdi-paw">Cadastro</v-btn>
      <v-btn to="/sobre" variant="text" class="pixel-font text-caption" prepend-icon="mdi-paw">Sobre</v-btn>

      <v-icon class="mr-4 ml-2" size="large">mdi-paw</v-icon>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// Lógica do App
</script>

<style>
/* Importação da fonte 8-bit do Google Fonts (Press Start 2P) */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

/* Classe utilitária para aplicar a fonte 8-bit */
.pixel-font {
  font-family: 'Press Start 2P', monospace !important;
}

/* Aplicando a fonte pixelada nos títulos principais e botões para consistência 8-bit */
h1,
.v-card-title,
.v-btn__content {
  font-family: 'Press Start 2P', monospace !important;
}

/* Ajuste específico para h1 para não ficar gigante com essa fonte */
h1 {
  font-size: 1.5rem !important;
  line-height: 2 !important;
}

/* Ajuste específico para títulos de cards */
.v-card-title {
  font-size: 1.1rem !important;
}
</style>
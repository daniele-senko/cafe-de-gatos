<template>
  <v-app>
    <v-app-bar color="brown-darken-3" prominent>
      <v-app-bar-title>Café de Gatos</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn to="/" variant="text">Home</v-btn>
      <v-btn to="/lista" variant="text">Lista</v-btn>
      <v-btn to="/cadastro" variant="text">Cadastro</v-btn>
      <v-btn to="/sobre" variant="text">Sobre</v-btn>
    </v-app-bar>


    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

  </v-app>
</template>

<script lang="ts" setup>
//lógica do componente raiz
</script>

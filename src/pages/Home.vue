<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" md="10" class="text-center">
        <h1 class="text-h3 font-weight-bold text-primary mb-4">
          Bem-vindo ao Café de Gatos
        </h1>
        <p class="text-h6 text-grey-darken-1 mb-8">
          O sistema oficial (8-bit Edition) para gerenciar nossos residentes
          felinos.
        </p>

        <v-row class="mb-8" justify="center">
          <v-col cols="12" sm="4">
            <EstatisticasBox
              titulo="Total de Gatos"
              :valor="totalGatos"
              cor="primary"
              icone="mdi-cat"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <EstatisticasBox
              titulo="Gatos Sociáveis"
              :valor="totalSociaveis"
              cor="secondary"
              icone="mdi-heart"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <EstatisticasBox
              titulo="Favoritos do Público"
              :valor="totalFavoritos"
              cor="pink-darken-3"
              icone="mdi-star"
            />
          </v-col>
        </v-row>

        <div class="d-flex justify-center gap-4">
          <v-btn
            color="primary"
            size="large"
            to="/lista"
            variant="flat"
            class="mr-4 text-caption pixel-font"
            prepend-icon="mdi-paw"
          >
            Ver Todos os Gatos
          </v-btn>
          <v-btn
            color="accent"
            size="large"
            to="/cadastro"
            variant="outlined"
            class="text-caption pixel-font"
            prepend-icon="mdi-paw"
          >
            + Cadastrar Novo
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useGatosStore } from "../store/gatos";
import EstatisticasBox from "../components/EstatisticasBox.vue";

const gatosStore = useGatosStore();

// Eu executo este hook onMounted assim que a tela inicial carrega para garantir que os dados sejam buscados do Firebase.
onMounted(async () => {
  await gatosStore.buscarGatos();
});

const totalGatos = computed(() => gatosStore.gatos.length);
const totalSociaveis = computed(
  () => gatosStore.gatos.filter((g) => g.sociavel).length,
);
const totalFavoritos = computed(
  () => gatosStore.gatos.filter((g) => g.favorito).length,
);
</script>

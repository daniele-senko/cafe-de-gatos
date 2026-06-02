<template>
    <v-container class="fill-height">
        <v-row justify="center" align="center">
            <v-col cols="12" md="10" class="text-center">
                <h1 class="text-h3 font-weight-bold text-brown-darken-4 mb-4">
                    Bem-vindo ao Café de Gatos
                </h1>
                <p class="text-h6 text-grey-darken-1 mb-8">
                    O sistema oficial para gerenciar nossos residentes felinos, suas áreas favoritas e o nível de
                    socialização com os clientes.
                </p>

                <v-row class="mb-8" justify="center">
                    <v-col cols="12" sm="4">
                        <EstatisticasBox titulo="Total de Gatos" :valor="totalGatos" cor="brown-lighten-1"
                            icone="mdi-cat" />
                    </v-col>
                    <v-col cols="12" sm="4">
                        <EstatisticasBox titulo="Gatos Sociáveis" :valor="totalSociaveis" cor="green-darken-1"
                            icone="mdi-heart" />
                    </v-col>
                    <v-col cols="12" sm="4">
                        <EstatisticasBox titulo="Favoritos do Público" :valor="totalFavoritos" cor="blue-darken-1"
                            icone="mdi-star" />
                    </v-col>
                </v-row>

                <div class="d-flex justify-center gap-4">
                    <v-btn color="brown-darken-3" size="large" to="/lista" variant="flat" class="mr-4">
                        Ver Todos os Gatos
                    </v-btn>
                    <v-btn color="primary" size="large" to="/cadastro" variant="outlined">
                        + Cadastrar Novo
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { gatos } from '../store/gatos';
import EstatisticasBox from '../components/EstatisticasBox.vue';

// propriedades computadas reativas. elas se atualizam sozinhas quando a lista 'gatos' muda.
const totalGatos = computed(() => gatos.value.length);
const totalSociaveis = computed(() => gatos.value.filter(g => g.sociavel).length);
const totalFavoritos = computed(() => gatos.value.filter(g => g.favorito).length);
</script>
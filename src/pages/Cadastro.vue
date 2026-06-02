<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="8" offset-md="2">
                <v-card elevation="2">
                    <v-card-title class="text-h5 pb-4">
                        Cadastrar Novo Gato
                    </v-card-title>

                    <v-card-text>
                        <v-form @submit.prevent="salvar">

                            <v-text-field v-model="gatoAtual.nome" label="Nome do Gato" variant="outlined"
                                required></v-text-field>

                            <v-text-field v-model="gatoAtual.raca" label="Raça" variant="outlined"
                                required></v-text-field>

                            <v-text-field v-model.number="gatoAtual.idade" label="Idade (anos)" type="number"
                                variant="outlined" required></v-text-field>

                            <v-select v-model="gatoAtual.area" :items="areasDisponiveis" label="Área do Café"
                                variant="outlined" required></v-select>

                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-switch v-model="gatoAtual.sociavel" label="É sociável com outros gatos?"
                                        color="primary"></v-switch>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-switch v-model="gatoAtual.favorito" label="É um favorito dos clientes?"
                                        color="secondary"></v-switch>
                                </v-col>
                            </v-row>

                            <v-card-actions class="px-0 pt-4">
                                <v-spacer></v-spacer>
                                <v-btn color="error" variant="text" to="/lista">Cancelar</v-btn>
                                <v-btn color="primary" variant="elevated" type="submit">Salvar</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { salvarGato } from '../store/gatos';
import type { Gato } from '../store/gatos';

// instancia do router para redirecionamento programatico 
const router = useRouter();

// opções para o v-select
const areasDisponiveis = ['Salão Principal', 'Jardim de Inverno', 'Área VIP', 'Espaço de Descanso'];

// objeto reativo para amarrar aos campos do formulário

const gatoAtual = ref<Gato>({
    id: 0,
    nome: '',
    raca: '',
    idade: 0,
    sociavel: true,
    area: '',
    favorito: false,
});

function salvar() {
    // caham a função do store para salvar em memória
    salvarGato(gatoAtual.value)

    //redireciona o usuário de volta para a lista após salvar
    router.push('/lista');
}
</script>
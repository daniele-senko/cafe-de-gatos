<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="8" offset-md="2">
                <v-card elevation="2" color="surface">
                    <v-card-title class="text-h5 pb-4 text-primary">
                        {{ isEditando ? `Editando: ${gatoAtual.nome}` : 'Cadastrar Novo Gato' }}
                    </v-card-title>

                    <v-card-text>
                        <v-form @submit.prevent="salvar">
                            <v-text-field v-model="gatoAtual.nome" label="Nome do Gato" variant="outlined"
                                color="primary" required></v-text-field>

                            <v-text-field v-model="gatoAtual.raca" label="Raça" variant="outlined" color="primary"
                                required></v-text-field>

                            <v-text-field v-model.number="gatoAtual.idade" label="Idade (anos)" type="number"
                                variant="outlined" color="primary" required></v-text-field>

                            <v-select v-model="gatoAtual.area" :items="areasDisponiveis" label="Área do Café"
                                variant="outlined" color="primary" required></v-select>

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
                                <v-btn color="error" variant="text" to="/lista" class="text-caption pixel-font"
                                    prepend-icon="mdi-paw">
                                    Cancelar
                                </v-btn>
                                <v-btn color="primary" variant="elevated" type="submit" class="text-caption pixel-font"
                                    prepend-icon="mdi-paw">
                                    Salvar
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { salvarGato, gatos } from '../store/gatos';
import type { Gato } from '../store/gatos';

// instancia do router para redirecionamento programatico 
const router = useRouter();
const route = useRoute();

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

//propriedade computada para saber se a tela está em modo edição
const isEditando = computed(() => gatoAtual.value.id !== 0);

/**
 * Hook de ciclo de vida executado quando o componente é montado.
 * Responsável por carregar os dados se um ID for passado na URL (Update).
 */
onMounted(() => {
    const paramId = route.params.id;

    if (paramId) {
        const idNumero = Number(paramId);
        // busca na ref global (store) o gato com o id correspondente
        const gatoExistente = gatos.value.find(g => g.id === idNumero);

        if (gatoExistente) {
            // cria uma copia dos dados para não alterar o store diretamente antes de clicar em salvar
            gatoAtual.value = { ...gatoExistente };
        }
    }
});

function salvar() {
    // chama a função do store para salvar em memória
    salvarGato(gatoAtual.value)

    //redireciona o usuário de volta para a lista após salvar
    router.push('/lista');
}
</script>
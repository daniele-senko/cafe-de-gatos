<template>
    <v-container>
        <v-row align="center" class="mb-4">
            <v-col>
                <h1 class="text-h4 text-primary">Nossos Gatos</h1>
            </v-col>
            <v-col class="text-right">
                <v-btn color="primary" to="/cadastro" prepend-icon="mdi-paw" class="text-caption pixel-font">
                    + Novo Gato
                </v-btn>
            </v-col>
        </v-row>

        <v-alert v-if="gatosStore.gatos.length === 0" type="info" variant="tonal" class="mt-4" color="primary">
            Nenhum gato cadastrado no café ainda. Clique em "+ Novo Gato" para adicionar o primeiro residente.
        </v-alert>

        <v-table v-else>
            <thead>
                <tr>
                    <th class="text-left text-primary">Nome</th>
                    <th class="text-left text-primary">Raça</th>
                    <th class="text-left text-primary">Idade</th>
                    <th class="text-left text-primary">Área</th>
                    <th class="text-left text-primary">Status</th>
                    <th class="text-center text-primary">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="gato in gatosStore.gatos" :key="gato.id">
                    <td class="font-weight-bold">{{ gato.nome }}</td>
                    <td>{{ gato.raca }}</td>
                    <td>{{ gato.idade }} anos</td>
                    <td>{{ gato.area }}</td>
                    <td>
                        <StatusGato :sociavel="gato.sociavel" :favorito="gato.favorito" />
                    </td>
                    <td class="text-center">
                        <v-btn size="small" color="warning" class="mr-2 text-caption pixel-font" variant="tonal"
                            :to="`/cadastro/${gato.id}`" prepend-icon="mdi-paw">
                            Editar
                        </v-btn>
                        <v-btn size="small" color="error" variant="tonal" class="text-caption pixel-font"
                            @click="gato.id && confirmarExclusao(gato.id)" prepend-icon="mdi-paw">
                            Excluir
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useGatosStore } from '../store/gatos';
import StatusGato from '../components/StatusGato.vue';

const gatosStore = useGatosStore();

// Eu uso o hook onMounted para garantir que os dados sejam buscados no Firebase logo na abertura da página
onMounted(async () => {
    await gatosStore.buscarGatos();
});

// Eu criei esta função para exclusão. O parâmetro 'id' é do tipo string, pois é assim que o Firebase gera as chaves únicas dos documentos.
function confirmarExclusao(id: string) {
    // Eu optei por manter o confirm nativo do navegador pela simplicidade e praticidade.
    const confirmacao = confirm('Tem certeza que deseja remover este gato do sistema?');
    if (confirmacao) {
        // Aqui eu chamo a action da store que efetua o deleteDoc no banco e atualiza a nossa lista reativa.
        gatosStore.excluirGato(id);
    }
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card elevation="2" color="surface">
          <v-card-title class="text-h5 pb-4 text-primary">
            {{
              isEditando ? `Editando: ${gatoAtual.nome}` : "Cadastrar Novo Gato"
            }}
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="salvar">
              <v-text-field
                v-model="gatoAtual.nome"
                label="Nome do Gato"
                variant="outlined"
                color="primary"
                required
              ></v-text-field>

              <v-text-field
                v-model="gatoAtual.raca"
                label="Raça"
                variant="outlined"
                color="primary"
                required
              ></v-text-field>

              <v-text-field
                v-model.number="gatoAtual.idade"
                label="Idade (anos)"
                type="number"
                variant="outlined"
                color="primary"
                required
              ></v-text-field>

              <v-select
                v-model="gatoAtual.area"
                :items="areasDisponiveis"
                label="Área do Café"
                variant="outlined"
                color="primary"
                required
              ></v-select>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-switch
                    v-model="gatoAtual.sociavel"
                    label="É sociável com outros gatos?"
                    color="primary"
                  ></v-switch>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-switch
                    v-model="gatoAtual.favorito"
                    label="É um favorito dos clientes?"
                    color="secondary"
                  ></v-switch>
                </v-col>
              </v-row>

              <v-card-actions class="px-0 pt-4">
                <v-spacer></v-spacer>
                <v-btn
                  color="error"
                  variant="text"
                  to="/lista"
                  class="text-caption pixel-font"
                  prepend-icon="mdi-paw"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="primary"
                  variant="elevated"
                  type="submit"
                  class="text-caption pixel-font"
                  prepend-icon="mdi-paw"
                >
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
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useGatosStore } from "../store/gatos";
import type { Gato } from "../store/gatos";

// Aqui eu instancio o router para poder redirecionar o usuário programaticamente via código
const router = useRouter();
const route = useRoute();
const gatosStore = useGatosStore();

const areasDisponiveis = [
  "Salão Principal",
  "Jardim de Inverno",
  "Área VIP",
  "Espaço de Descanso",
];

const gatoAtual = ref<Gato>({
  id: "",
  nome: "",
  raca: "",
  idade: 0,
  sociavel: true,
  area: "",
  favorito: false,
});

// Criei esta propriedade computada para verificar se estamos no modo de edição. 
// Se o ID não estiver vazio, sei que um documento do Firestore foi carregado.
const isEditando = computed(() => gatoAtual.value.id !== "");

// Eu uso o hook onMounted para executar a lógica de carregamento assim que a tela abre.
onMounted(async () => {
  const paramId = route.params.id;

  if (paramId) {
    const idString = String(paramId);

    // Faço uma verificação para garantir que a lista esteja carregada antes de buscar o gato pelo ID.
    // Se a lista já estiver populada (ex: o usuário veio da tela de lista), eu evito uma requisição desnecessária ao Firestore.
    if (gatosStore.gatos.length === 0) {
      await gatosStore.buscarGatos();
    }

    // Procuro na store local o registro cujo ID coincide com a chave do documento passado na rota
    const gatoExistente = gatosStore.gatos.find((g) => g.id === idString);

    if (gatoExistente) {
      // Aqui eu clono os dados do gato encontrado para o 'gatoAtual'. Uso o spread operator (...) para não alterar o estado global da store antes do usuário clicar em Salvar.
      gatoAtual.value = { ...gatoExistente };
    }
  }
});

async function salvar() {
  try {
    await gatosStore.salvarGato(gatoAtual.value);
    router.push("/lista");
  } catch (error) {
    console.error("erro ao processar salvamento assíncrono:", error);
  }
}
</script>

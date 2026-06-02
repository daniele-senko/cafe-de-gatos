<template>
  <v-container>
    <v-row align="center" class="mb-4">
      <v-col>
        <h1 class="text-h4">Nossos Gatos</h1>
      </v-col>
      <v-col class="text-right">
        <v-btn color="primary" to="/cadastro">
          + Novo Gato
        </v-btn>
      </v-col>
    </v-row>

    <v-alert
      v-if="gatos.length === 0"
      type="info"
      variant="tonal"
      class="mt-4"
    >
      Nenhum gato cadastrado no café ainda. Clique em "+ Novo Gato" para adicionar o primeiro residente.
    </v-alert>

    <v-table v-else>
      <thead>
        <tr>
          <th class="text-left">Nome</th>
          <th class="text-left">Raça</th>
          <th class="text-left">Idade</th>
          <th class="text-left">Área</th>
          <th class="text-left">Status</th>
          <th class="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="gato in gatos" :key="gato.id">
          <td>{{ gato.nome }}</td>
          <td>{{ gato.raca }}</td>
          <td>{{ gato.idade }} anos</td>
          <td>{{ gato.area }}</td>
          <td>
            <v-chip size="small" :color="gato.sociavel ? 'success' : 'warning'" class="mr-2">
              {{ gato.sociavel ? 'Sociável' : 'Tímido' }}
            </v-chip>
            <v-chip v-if="gato.favorito" size="small" color="primary">
              Favorito
            </v-chip>
          </td>
          <td class="text-center">
            <v-btn size="small" color="warning" class="mr-2" variant="tonal">Editar</v-btn>
            <v-btn size="small" color="error" variant="tonal">Excluir</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup lang="ts">
// importa direito da ref da lista do store
import { gatos } from '../store/gatos'
</script>
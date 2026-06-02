<template>
    <v-card :color="cor" theme="dark" elevation="3" class="rounded-lg">
        <v-card-text class="d-flex align-center">
            <div>
                <div class="text-subtitle-1 font-weight-medium">{{ titulo }}</div>
                <div class="text-h3 font-weight-bold mt-1">{{ valor }}</div>
            </div>
            <v-spacer></v-spacer>
            <v-icon size="64" class="opacity-30">{{ icone }}</v-icon>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
// defineProps é a forma de declarar propriedades recebidas do componente pai
defineProps<{
    titulo: string;
    valor: number;
    cor: string;
    icone: string;
}>();
</script>
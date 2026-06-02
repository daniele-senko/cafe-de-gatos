<template>
    <div class="d-flex align-center">
        <v-chip size="small" :color="sociavel ? 'success' : 'warning'" class="mr-2" variant="flat">
            {{ sociavel ? 'Sociável' : 'Tímido' }}
        </v-chip>
        <v-chip v-if="favorito" size="small" color="primary" variant="elevated">
            Favorito
        </v-chip>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    sociavel: boolean;
    favorito: boolean;
}>();
</script>
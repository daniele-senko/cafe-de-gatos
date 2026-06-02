<template>
    <v-container class="text-center fill-height d-flex flex-column justify-center">

        <v-icon size="100" color="primary" class="mb-6">mdi-cat</v-icon>

        <h1 class="mb-8 text-primary">Sobre o Projeto</h1>

        <v-card class="mx-auto pa-4" max-width="600" elevation="4" color="surface">
            <v-card-text>
                <h2 class="text-h6 font-weight-bold text-black mb-2">
                    Daniele Senko de Lima
                </h2>

                <p class="text-body-1 text-black mb-6">
                    Matrícula: 20220016284
                </p>

                <v-divider color="primary" class="border-opacity-100 mb-6"></v-divider>

                <p class="text-body-1 text-black font-weight-bold mb-2">
                    Tema: Café de Gatos (Pixel Art Edition)
                </p>
                <p class="text-body-2 text-black">
                    Mini-aplicação desenvolvida para a disciplina de Frameworks Modernos para Desenvolvimento de
                    Sistemas (UNEMAT).
                    O sistema realiza o gerenciamento de residentes felinos, áreas do café e preferências dos clientes
                    em memória, cumprindo todas as exigências do CRUD.
                </p>
            </v-card-text>
        </v-card>

    </v-container>
</template>

<script setup lang="ts"></script>
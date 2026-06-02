/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify'
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const temaPixelCatMonocromatico = {
  dark: false,
  colors: {
    background: '#FFF5F8', // Rosa extremamente claro para o fundo (quase branco)
    surface: '#FCE4EC',    // Rosa muito claro para os cards
    primary: '#E91E63',    // Rosa Vibrante (Voz Principal)
    secondary: '#F48FB1',  // Rosa Médio (Destaques)
    accent: '#C2185B',     // Rosa Escuro (para contraste, se necessário)
    error: '#D32F2F',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'temaPixelCatMonocromatico',
    themes: {
      temaPixelCatMonocromatico,
    }
  },
})

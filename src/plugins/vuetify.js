/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// Design tokens. Component-level styling lives in src/styles/app.css.
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          'primary': '#1F6FD1',
          'primary-darken-1': '#175AAD',
          'secondary': '#0F2D52',
          'background': '#F4F6FA',
          'surface': '#FFFFFF',
          'surface-bright': '#FFFFFF',
          'surface-light': '#EEF2F7',
          'surface-variant': '#E7ECF3',
          'on-surface-variant': '#334155',
          'on-background': '#0F172A',
          'on-surface': '#0F172A',
          'error': '#C62828',
          'success': '#13795B',
          'warning': '#B45309',
          'info': '#1F6FD1',
        },
        variables: {
          'border-color': '#0F172A',
          'border-opacity': 0.1,
          'high-emphasis-opacity': 0.92,
          'medium-emphasis-opacity': 0.64,
          'disabled-opacity': 0.4,
        },
      },
    },
  },
  defaults: {
    VBtn: { rounded: 'lg', elevation: 0 },
    VCard: { rounded: 'xl', elevation: 0, border: true },
    VTextField: { variant: 'outlined', density: 'comfortable', rounded: 'lg', color: 'primary' },
    VSelect: { variant: 'outlined', density: 'comfortable', rounded: 'lg', color: 'primary' },
    VTextarea: { variant: 'outlined', density: 'comfortable', rounded: 'lg', color: 'primary' },
    VAlert: { variant: 'tonal', rounded: 'lg' },
    VChip: { rounded: 'pill' },
    VDialog: { VCard: { border: false, elevation: 8 } },
    VMenu: { VList: { density: 'compact', rounded: 'lg' } },
    VPagination: { rounded: 'lg', density: 'comfortable', activeColor: 'primary' },
    VProgressLinear: { color: 'primary', rounded: true },
    VCheckbox: { color: 'primary' },
    VBtnToggle: { color: 'primary', rounded: 'lg' },
  },
})

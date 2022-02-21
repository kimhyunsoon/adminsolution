import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import ko from 'vuetify/lib/locale/ko';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#0031B2',
        secondary: '#6ba1cf',
        accent: '#AA6063',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
  lang: {
    locales: { ko },
    current: 'ko',
  },
});

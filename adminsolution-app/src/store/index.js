import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import dialog from './dialog';
import progress from './progress';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    dialog,
    progress,
  },
});

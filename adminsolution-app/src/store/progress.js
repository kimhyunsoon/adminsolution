export default {
  namespaced: true,
  state: {
    show: false,
  },
  getters: {
    progressState(state) {
      return {
        show: state.show,
      };
    },
  },
  mutations: {
    updateProgress(state, bool) {
      state.show = bool;
    },
  },
};

export default {
  namespaced: true,
  state: {
    show: false,
    timeout: 4000,
    timeoutInterval: true,
    type: 'info',
    msg: '',
  },
  getters: {
    alertState(state) {
      return {
        show: state.show,
        type: state.type,
        // primary, error, info, success,
        msg: state.msg,
        timeout: state.timeout,
      };
    },
  },
  mutations: {
    closeAlert(state) {
      state.show = false;
    },
    updateAlert(state, { type, msg, timeout }) {
      state.show = false;
      state.timeout = null;
      setTimeout(() => {
        state.type = type == null ? 'info' : type;
        state.msg = msg;
        state.timeout = timeout == null ? 4000 : timeout;
        state.show = true;

        if (timeout !== false) {
          const startInterval = () => {
            state.timeoutInterval = false;
            const interval = setInterval(() => {
              state.timeout -= 100;
              if (state.timeout === 0) {
                state.show = false;
                state.timeout = false;
                state.timeoutInterval = true;
                clearInterval(interval);
              }
            }, 100);
          };
          if (state.timeoutInterval) {
            startInterval();
          }
        }
      }, 400);
    },
  },
  actions: {
  },
};

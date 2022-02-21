// import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    userInfo: {
      seq: null,
      name: null,
      group: null,
      id: null,
    },
    companyInfo: {
      engName: null,
      krName: null,
    },
  },
  getters: {
    userInfo(state) {
      return state.userInfo;
    },
    companyInfo(state) {
      return state.companyInfo;
    },
  },
  mutations: {
    updateUserInfo(state, value) {
      state.userInfo = value;
    },
    updateCompanyInfo(state, value) {
      state.companyInfo = value;
    },
  },
};

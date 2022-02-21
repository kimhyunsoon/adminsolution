<template>
  <div class="alertWrap">
    <v-alert
      :value="alertState.show"
      :type="alertState.type"
      transition="slide-y-transition"
      dense
    >
      {{ alertState.msg }}
      <v-icon
        v-if="alertState.timeout === false"
        color="white"
        class="closeIcon"
        @click="closeAlert"
      >
        mdi-close
      </v-icon>
    </v-alert>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'DlgAlert',
  computed: {
    ...mapGetters({
      alertState: 'dialog/alertState',
    }),
  },
  methods: {
    ...mapMutations({
      updateAlert: 'dialog/updateAlert',
      closeAlert: 'dialog/closeAlert',
    }),
  },
};
</script>

<style scoped lang="scss">
  .alertWrap {
    z-index: 1000;
    width: 100vw;
    position: fixed;
    top:0px;
    background-color: rgba(0,0,0,0);
    display: flex;
    align-items: center;
    justify-content: center;
    .v-alert {
      margin-top:10px;
      box-shadow: 0px 2px 8px rgba(0,0,0,0.1) !important;
      font-weight: 500;
      margin-bottom:0px;
      .closeIcon {
        margin-left: 20px;
        opacity: .8;
        cursor: pointer;
        margin-top:-3px;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
</style>

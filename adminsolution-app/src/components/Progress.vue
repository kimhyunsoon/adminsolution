<template>
  <div
    v-if="progressState.show"
    class="progressWrap"
  >
    <v-progress-circular
      indeterminate
      color="primary"
      :size="50"
      :width="10"
    ></v-progress-circular>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Progress',
  computed: {
    ...mapGetters({
      progressState: 'progress/progressState',
    }),
  },
};
</script>

<style scoped lang="scss">
  .progressWrap {
    z-index: 900;
    width: 100vw;
    height: 100vh;
    position: fixed;
    display: flex;
    top:0px;
    left: 0px;
    background-color: rgba(255,255,255,0.4);
    align-items: center;
    justify-content: center;
  }
</style>

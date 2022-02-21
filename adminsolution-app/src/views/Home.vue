<template>
  <div class="">
    <p>홈</p>
    <v-btn @click="logout">로그아웃</v-btn>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Home',
  components: {
  },
  mounted() {
    console.log('Home mounted');
  },
  computed: {
    ...mapGetters({
      userInfo: 'auth/userInfo',
      companyInfo: 'auth/companyInfo',
    }),
  },
  methods: {
    ...mapMutations({
      updateUserInfo: 'auth/updateUserInfo',
      updateCompanyInfo: 'auth/updateCompanyInfo',
      updateAlert: 'dialog/updateAlert',
    }),
    logout() {
      localStorage.removeItem(`MANOadmin.${this.companyInfo.engName}.authToken`);
      this.$router.push('/signin');
      this.updateAlert({ type: 'info', msg: '로그아웃 되었습니다.', timeout: false });
    },
  },
};
</script>

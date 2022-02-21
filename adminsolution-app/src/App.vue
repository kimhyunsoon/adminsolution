<template>
  <v-app id="app">
    <Progress/>
    <DlgAlert/>
    <router-view/>
  </v-app>
</template>
<script>
import Progress from '@/components/Progress.vue';
import DlgAlert from '@/components/dialog/DlgAlert.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Home',
  components: {
    DlgAlert,
    Progress,
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
    authChecked() {
      this.updateCompanyInfo({
        engName: 'barun',
        krName: '바른경제TV',
      });

      const userAuth = localStorage.getItem(`MANOadmin.${this.companyInfo.engName}.authToken`);
      if (userAuth == null) {
        if (this.$route.path !== '/signin') {
          this.$router.push('/signin');
        }
      } else if (userAuth === 'test') {
        this.updateUserInfo({
          seq: 0,
          name: '홍길동',
          id: 'test',
          group: '바른 영업부 여의도1팀',
        });
        if (this.$route.path !== '/') {
          this.$router.push('/');
        }
      } else {
        console.log('fff');
      }
    },
  },
  watch: {
    /* eslint-disable */
    '$route': {
      handler(to, from) {
        this.authChecked();
      },
      immediate: true,
    },
  },
  mounted() {
    console.log('App mounted');
  },
};
</script>
<style>
  * {
    box-sizing: border-box;
    font-family: 'NotoSans';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  @font-face {
    font-family: 'NotoSans';
    src: url('assets/fonts/NotoSansKR-Thin.otf');
    font-weight: 100;
  }

  @font-face {
    font-family: 'NotoSans';
    src: url('assets/fonts/NotoSansKR-Light.otf');
    font-weight: 300;
  }

  @font-face {
    font-family: 'NotoSans';
    src: url('assets/fonts/NotoSansKR-Regular.otf');
    font-weight: 400;
  }

  @font-face {
    font-family: 'NotoSans';
    src: url('assets/fonts/NotoSansKR-Medium.otf');
    font-weight: 500;
  }

  @font-face {
    font-family: 'NotoSans';
    src: url('assets/fonts/NotoSansKR-Bold.otf');
    font-weight: 700;
  }

  @font-face {
    font-family: 'NotoSans';
    src: url('assets/fonts/NotoSansKR-Black.otf');
    font-weight: 900;
  }

</style>

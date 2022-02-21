<template>
  <div class="outerWrap">
    <div class="innerWrap">
      <div class="box">
        <div class="title">
          <div class="company">
            <img src="../../assets/img/companyIcon.svg" alt="admin">
            <p>{{ companyInfo.krName }}</p>
          </div>
        </div>
        <div class="brand">
          <img class="brand" src="../../assets/img/manoadmin.svg" alt="마노어드민">
        </div>
        <div class="formWrap">
          <div class="form">
            <v-checkbox
              class="check"
              :label="`아이디 저장`"
              color="primary"
              v-model="user.saved"
            ></v-checkbox>
            <v-text-field
              label="아이디"
              outlined
              color="primary"
              hide-details
              class="mb-5"
              v-model="user.id"
            ></v-text-field>
            <v-text-field
              label="비밀번호"
              outlined
              color="primary"
              type="password"
              hide-details
              v-model="user.pw"
              @keyup="$event.key === 'Enter'?loginMethod():''"
            ></v-text-field>
            <v-btn
              block
              depressed
              color="primary"
              x-large
              class="mt-10 mb-2"
              @click="loginMethod"
              :disabled="loginDisabled"
            >
              로그인
            </v-btn>
          </div>
        </div>
      </div>

    </div>
    <p class="bottomMsg">Copyright © ManoLab. All rights reserved.</p>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'SignIn',
  components: {
  },
  computed: {
    ...mapGetters({
      userInfo: 'auth/userInfo',
      companyInfo: 'auth/companyInfo',
    }),
  },
  data: () => ({
    user: {
      id: '',
      pw: '',
      saved: false,
    },
    loginDisabled: true,
  }),
  methods: {
    ...mapMutations({
      updateAlert: 'dialog/updateAlert',
      closeAlert: 'dialog/closeAlert',
      updateProgress: 'progress/updateProgress',
      updateUserInfo: 'auth/updateUserInfo',
      updateCompanyInfo: 'auth/updateCompanyInfo',
    }),
    loginMethod() {
      // 0. this.loginDisabled == false 일때
      // 1. 소켓으로 로그인 통신하고
      // 2. 성공하면
      // 2-1. API에 따라 auth 생성해서 저장하고 (vuex, local storage)
      // 2-2. '아이디 저장' 정보 스토리지에 저장 (체크해제여도 그대로 진행)
      //    const saveId = this.user.saved ? this.user.id : '';
      //    const saveID = JSON.stringify({
      //      id: id,
      //      saved: this.user.saved,
      //    });
      //    localStorage.setItem('MANOadmin.barun.saveID', saveID);
      // 2-3. route 이동하고 알림창
      //    this.updateAlert({ type: 'succes', msg: `${이름} 님 반갑습니다.` })

      // 3. 실패하면
      //    this.updateAlert({ type: 'error', msg: '로그인 정보를 확인해주세요.' })

      // 이 아래는 테스트용~~~
      if (this.loginDisabled === false) {
        this.updateProgress(true);
        if (this.user.id === 'test' && this.user.pw === 'test') {
          setTimeout(() => {
            // '아이디 저장' 체크 용도
            const saveID = JSON.stringify({
              id: this.user.saved ? this.user.id : '',
              saved: this.user.saved,
            });
            localStorage.setItem(`MANOadmin.${this.companyInfo.engName}.saveID`, saveID);
            // vuex 유저정보 저장 + 토큰 스토리지 저장
            localStorage.setItem(`MANOadmin.${this.companyInfo.engName}.authToken`, this.user.id);
            this.updateUserInfo({
              seq: 0,
              name: '홍길동',
              id: this.user.id,
              group: '바른 영업부 여의도1팀',
            });
            this.updateAlert({ type: 'success', msg: `${this.userInfo.name} 님 반갑습니다.` });
            this.$router.push('/');
            this.updateProgress(false);
          }, 1000);
        } else {
          setTimeout(() => {
            this.updateProgress(false);
            this.updateAlert({ type: 'error', msg: '로그인 정보를 확인해주세요.', timeout: false });
          }, 1000);
        }
      }
    },
  },
  watch: {
    user: {
      deep: true,
      handler() {
        if (this.user.id === null || this.user.id === '' || this.user.pw === null || this.user.pw === '') {
          this.loginDisabled = true;
        } else {
          this.loginDisabled = false;
        }
      },
    },
  },
  mounted() {
    // 아이디 저장 체크
    const saveID = JSON.parse(localStorage.getItem(`MANOadmin.${this.companyInfo.engName}.saveID`));
    if (saveID && saveID.id && saveID.saved) {
      this.user.id = saveID.id;
      this.user.saved = saveID.saved;
    }
  },
};
</script>

<style lang="scss" scoped>
  .outerWrap {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-content: center;
    justify-content: center;
    background-color: #fafafa;
    flex-wrap: wrap;
    .bottomMsg {
      width: 100%;
      text-align: center;
      margin-top:8px;
      color:#555;
      font-weight: 300;
      font-size: .8rem;
    }
    .innerWrap {
      width: 400px;
      .box {
        width: 100%;
        border-radius: 30px;
        background-color: #fff;
        border:1px solid #ddd;
        padding:30px;
        padding-top:25px;
        .title {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .company{
            display: flex;
            flex-shrink: 0;
            align-items: center;
            img {
              width: 20px;
              margin-top:2px;
              margin-right: 4px;
            }
            p{
              font-weight: 700;
              font-size: 1rem;
              margin:0;
            }
          }
        }
        .brand {
          width:100%;
          display: flex;
          justify-content: center;
          margin-top:30px;
          margin-bottom:20px;
          img{
            width: 240px;
          }
        }
        .formWrap{
          display: flex;
          justify-content: center;
          .form{
            width: 100%;
          }
        }
      }
    }
  }

</style>

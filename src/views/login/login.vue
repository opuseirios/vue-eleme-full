<template>
  <div class='login'>
    <page-header title="密码登录"></page-header>
    <section class="login-content">
      <div class="input-container">
        <input type="text" placeholder="账号" v-model="userName">
      </div>
      <div class="input-container">
        <input :type="passType" placeholder="密码" v-model="password">
        <button-switch @on="switchOn" @off="switchOff"></button-switch>
      </div>
      <div class="input-container">
        <input type="text" maxlength="4" placeholder="验证码" v-model="code">
        <div class="code">
          <img :src="imgCode" alt="">
          <div class="change-img" @click="getImgCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </div>
    </section>
    <p class="login-tips">
      温馨提示：未注册过的账号，登录时将自动注册
    </p>
    <p class="login-tips">
      注册过的用户可凭账号密码登录
    </p>
    <div class="login-btn" @click.stop.prevent="testLogin">登录</div>
    <router-link to="/forget" class="reset">
      重置密码？
    </router-link>
    <alert-tip ref="alertTip" :tip-text="tipText"></alert-tip>
  </div>
</template>

<script>
  import PageHeader from './../../base/pageHeader/pageHeader'
  import AlertTip from './../../base/alert-tip/alert-tip'
  import ButtonSwitch from './../../base/button-switch/button-switch'
  import axios from 'axios'
  import {mapMutations} from 'vuex'

  export default {
    name: '',
    components: {PageHeader, ButtonSwitch, AlertTip},
    data() {
      return {
        showPassword: false,
        imgCode: '',
        userName: '',
        password: '',
        code: '',
        tipText: ''
      }
    },
    computed: {
      passType() {
        return this.showPassword ? 'text' : 'password'
      }
    },
    created() {
      /*让axios携带cookie,这样验证码的识别能够通过*/
      axios.defaults.withCredentials=true;
      this.$nextTick(()=>{
        this.getImgCode();
      });
    },
    methods: {
      switchOn() {
        this.showPassword = true;
      },
      switchOff() {
        this.showPassword = false;
      },
      getImgCode() {
        axios.post('https://elm.cangdu.org/v1/captchas')
          .then((res) => {
            if (res.status === 200) {
              this.imgCode = res.data.code;
            }
          })
      },
      testLogin() {
        if (this.userName === '') {
          this.tipText = '请输入手机号/邮箱/用户名'
          this.showTip()
        } else if (this.password === '') {
          this.tipText = '请输入密码'
          this.showTip()
        } else if (this.code === '') {
          this.tipText = '请输入验证码'
          this.showTip()
        } else {
          this._getLoginInfo(this.userName, this.password, this.code);
        }
      },
      showTip() {
        this.$refs.alertTip.show();
      },
      _getLoginInfo(username, password, code) {
        axios.post('https://elm.cangdu.org/v2/login', {
          username,
          password,
          captcha_code: code
        }).then((res) => {
           if(res.status === 200){
             const data = res.data;
             /*如果信息错误*/
             if(data.message){
               this.tipText = data.message;
               this.showTip();
               this.code = '';
               this.getImgCode();
             }else {
               this.setUserInfo(data);
               this.$router.go(-1);
             }
           }
        })
      },
      ...mapMutations({
        setUserInfo:'SET_USER_INFO'
      })
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";

  .login {
    .login-content {
      margin-top: 30px;
      .input-container {
        background: #fff;
        padding: 30px 30px;
        height: 40px;
        border-bottom: 1px solid $color-border;
        display: flex;
        justify-content: space-between;
        input {
          font-size: 32px;
          color: $color-text;
        }
        .code {
          display: flex;
          align-items: center;
          img {
            width: 160px;
            height: 50px;
          }
          .change-img {
            margin-left: 10px;
            p {
              font-size: 22px;
              &:last-child {
                color: $color-main;
                margin-top: 10px;
              }
            }
          }
        }
      }
    }
    .login-tips {
      font-size: 22px;
      color: red;
      padding: 20px 30px;
    }
    .login-btn {
      margin: 0 auto;
      width: 710px;
      background: $color-sub;
      color: #fff;
      height: 90px;
      line-height: 90px;
      border-radius: 10px;
      text-align: center;
      font-size: 32px;
      font-weight: 500;
    }
    .reset {
      display: inline-block;
      margin-top: 60px;
      margin-left: 560px;
      text-align: right;
      font-size: 32px;
      color: $color-main;
    }
  }
</style>

<template>
  <div class='forget'>
    <page-header title="重置密码"></page-header>
    <section class="forget-content">
      <div class="input-container">
        <input type="text" placeholder="账号" v-model="username">
      </div>
      <div class="input-container">
        <input type="number" placeholder="旧密码" v-model="password">
      </div>
      <div class="input-container">
        <input type="password" placeholder="请输入新密码" v-model="newPassword">
      </div>
      <div class="input-container">
        <input type="password" placeholder="请确认密码" v-model="repassword">
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
    <div class="forget-btn" @click="changePwd">确认修改</div>
    <alert-tip :tip-text="tipText"></alert-tip>
  </div>
</template>

<script>
  import PageHeader from './../../base/pageHeader/pageHeader'
  import ButtonSwitch from './../../base/button-switch/button-switch'
  import AlertTip from './../../base/alert-tip/alert-tip'
  import {mapMutations} from 'vuex'
  import axios from 'axios'

  export default {
    name: '',
    components: {PageHeader, ButtonSwitch, AlertTip},
    data() {
      return {
        showPassword: false,
        imgCode: '',
        username: '',
        password: '',
        repassword: '',
        newPassword: '',
        code: '',
        tipText:''
      }
    },
    computed: {
      passType() {
        return this.showPassword ? 'text' : 'password'
      }
    },
    created() {
      axios.defaults.withCredentials=true;
      this.getImgCode();
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
      changePwd() {
        if (this.username === '') {
          this.tipText = '请输入正确的账号'
          this.showTip()
        } else if (this.password === '') {
          this.tipText = '请输入旧密码'
          this.showTip()
        } else if (this.newPassword === '') {
          this.tipText = '请输入新密码'
          this.showTip()
        } else if(this.repassword === ''){
          this.tipText = '请确认密码'
          this.showTip();
        }else if(this.code === ''){
          this.tipText = '请输入验证码'
          this.showTip();
        }else {
          this._getNewPassword(this.username,this.password,this.newPassword,this.repassword,this.code);
        }
      },
      _getNewPassword(username,oldpassWord,newpassword,confirmpassword,captcha_code){
          axios.post('https://elm.cangdu.org/v2/changepassword',{
            username,
            oldpassWord,
            newpassword,
            confirmpassword,
            captcha_code
          }).then((res)=>{
            if(res.status === 200){
              const data = res.data;
              /*如果信息错误*/
              if(data.message){
                this.tipText = data.message;
                this.showTip();
                this.code = '';
                this.getImgCode();
              }else {
                this.code = '修改密码成功';
                this.showTip();
                this.setUserInfo(data);
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

  .forget {
    .forget-content {
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
    .forget-btn {
      margin: 40px auto;
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
  }
</style>

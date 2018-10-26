<template>
  <div class='forget'>
    <page-header title="重置密码"></page-header>
    <section class="forget-content">
      <div class="input-container">
        <input type="text" placeholder="账号">
      </div>
      <div class="input-container">
        <input type="password" placeholder="旧密码">
      </div>
      <div class="input-container">
        <input type="password" placeholder="请输入新密码">
      </div>
      <div class="input-container">
        <input type="password" placeholder="请确认密码">
      </div>
      <div class="input-container">
        <input type="number" maxlength="4" placeholder="验证码">
        <div class="code">
          <img :src="imgCode" alt="">
          <div class="change-img" @click="getImgCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </div>
    </section>
    <div class="forget-btn">确认修改</div>
  </div>
</template>

<script>
  import PageHeader from './../../base/pageHeader/pageHeader'
  import ButtonSwitch from './../../base/button-switch/button-switch'
  import axios from 'axios'

  export default {
    name: '',
    components: {PageHeader,ButtonSwitch},
    data(){
      return{
        showPassword:false,
        imgCode:''
      }
    },
    computed:{
      passType(){
        return this.showPassword?'text':'password'
      }
    },
    created(){
      this.getImgCode();
    },
    methods:{
      switchOn(){
        this.showPassword = true;
      },
      switchOff(){
        this.showPassword = false;
      },
      getImgCode(){
        axios.post('https://elm.cangdu.org/v1/captchas')
          .then((res)=>{
            if(res.status === 200){
              this.imgCode = res.data.code;
            }
          })
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";
  .forget{
    .forget-content{
      margin-top: 30px;
      .input-container{
        background: #fff;
        padding: 30px 30px;
        height: 40px;
        border-bottom: 1px solid $color-border;
        display: flex;
        justify-content: space-between;
        input{
          font-size: 32px;
          color: $color-text;
        }
        .code{
          display: flex;
          align-items: center;
          img{
            width: 160px;
            height: 50px;
          }
          .change-img{
            margin-left: 10px;
            p{
              font-size: 22px;
              &:last-child{
                color: $color-main;
                margin-top: 10px;
              }
            }
          }
        }
      }
    }
    .forget-btn{
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

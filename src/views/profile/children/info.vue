<template>
  <slide>
    <div class='info'>
      <page-header title="账户信息"></page-header>
      <section class="user-info">
        <div class="user-item avatar">
          <input type="file" class="upload">
          <span class="name">头像</span>
          <div class="content">
            <img src="http://elm.cangdu.org/img/default.jpg" alt="">
            <i class="icon-arrow-right"></i>
          </div>
        </div>
        <div class="user-item" @click="setUserName">
          <span class="name">用户名</span>
          <div class="content">
            <span class="username">{{username}}</span>
            <i class="icon-arrow-right"></i>
          </div>
        </div>
        <div class="user-item"  @click="address">
          <span class="name">收货地址</span>
          <div class="content">
            <span class="address"></span>
            <i class="icon-arrow-right"></i>
          </div>
        </div>
      </section>
      <section class="setting">
        <h4 class="title">账号绑定</h4>
        <div class="content" @click="bindTel">
          <div class="left">
            <i class="el-icon-mobile-phone"></i>
            <span>手机</span>
          </div>
          <div class="right">
            <i class="icon-arrow-right"></i>
          </div>
        </div>
      </section>
      <section class="setting">
        <h4 class="title">安全设置</h4>
        <div class="content" @click="changePassword">
          <div class="left">
            <span>登录密码</span>
          </div>
          <div class="right">
            <span>修改</span>
            <i class="icon-arrow-right"></i>
          </div>
        </div>
      </section>
      <div class="logout" @click="logout">
        退出登录
      </div>
      <confirm confirm-text="是否退出登录" cancel-btn-text="再等等" confirm-btn-text="退出登录" ref="confirm" @confirm="confirm"></confirm>
      <alert-tip tip-text="请在手机APP中设置" ref="alertTip"></alert-tip>
      <router-view></router-view>
    </div>
  </slide>

</template>

<script>
  import PageHeader from './../../../base/pageHeader/pageHeader'
  import Slide from './../../../base/slide/slide'
  import AlertTip from './../../../base/alert-tip/alert-tip'
  import Confirm from './../../../base/confirm/confirm'
  import {mapGetters,mapMutations} from 'vuex';

  export default {
    name: '',
    components: {PageHeader, Slide, Confirm, AlertTip},
    computed:{
      ...mapGetters([
        'userInfo'
      ])
    },
    mounted(){
      this.initData();
    },
    data(){
      return{
        profileTitle: '我的',
        username: '登录/注册',           //用户名
        resetName: '',
        mobile: '暂无绑定手机号',             //电话号码
        balance: 0,            //我的余额
        count: 0,             //优惠券个数
        pointNumber: 0,       //积分数
        avatar: '',             //头像地址
      }
    },
    methods: {
      setUserName() {
        this.$router.push({
          path:'/profile/info/setUserName'
        })
      },
      initData() {
        if (this.userInfo && this.userInfo.user_id) {
          this.avatar = this.userInfo.avatar;
          this.username = this.userInfo.username;
          this.mobile = this.userInfo.mobile || '暂无绑定手机号';
          this.balance = this.userInfo.balance;
          this.count = this.userInfo.gift_amount;
          this.pointNumber = this.userInfo.point;
        } else {
          this.username = '登录/注册';
          this.mobile = '暂无绑定手机号';
        }
      },
      /*退出登录*/
      logout(){
        this.$refs.confirm.show();
      },
      confirm(){
        this.setLogout();
        this.$router.go(-1);
      },
      changePassword(){
        this.$router.push({
          path:'/forget'
        })
      },
      bindTel(){
        this.$refs.alertTip.show();
      },
      address(){
        this.$router.push({
          path:'/profile/info/address'
        })
      },
      ...mapMutations({
        setLogout:"SET_LOG_OUT"
      })
    },
    watch:{
      userInfo(newInfo){
        if(newInfo){
          this.initData();
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../../assets/scss/variables";

  .info {
    width: 100%;
    height: 100%;
    background: $color-background;
    .user-info {
      margin-top: 20px;
      .user-item {
        background: #fff;
        border-bottom: 1px solid $color-border;
        display: flex;
        padding: 0 20px;
        height: 90px;
        align-items: center;
        justify-content: space-between;
        &.avatar {
          position: relative;
          height: 130px;
          input {
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
          }
          img {
            width: 90px;
            height: 90px;
            border-radius: 50%;
          }
        }
        .name {
          font-size: 26px;
        }
        .content {
          display: flex;
          align-items: center;
          span {
            color: $color-text-bold;
            font-size: 32px;
          }
          i {
            margin-left: 20px;
          }
        }
      }
    }
    .setting {
      .title {
        line-height: 60px;
        font-size: 24px;
        color: $color-text;
        padding-left: 20px;
      }
      .content {
        background: #fff;
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        height: 90px;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          i {
            font-size: 36px;
            margin-right: 20px;
          }
          span {
            font-size: 26px;
            color: $color-text;
          }
        }
        .right {
          display: flex;
          align-items: center;
          span {
            font-size: 32px;
            color: $color-text-bold;
            margin-right: 20px;
          }
          i {
            font-size: 32px;
            color: $color-text-bold;
          }
        }
      }
    }
    .logout {
      margin: 50px 20px;
      background: #d8584a;
      border-radius: 10px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      color: #fff;
    }
  }
</style>

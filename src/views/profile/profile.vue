<template>
  <div class='profile'>
    <pageHeader title="我的"></pageHeader>
    <section class="profile-info" @click="login">
      <div class="privateImg">
        <img src="http://elm.cangdu.org/img/default.jpg" alt="">
      </div>
      <div class="userInfo">
        <p>登录/注册</p>
        <p>
          <i class="el-icon-mobile-phone"></i>
          <span>暂无绑定手机号</span>
        </p>
      </div>
      <div class="arrow">
        <i class="icon-arrow-right"></i>
      </div>
    </section>
    <section class="info-data">
      <div class="info-item">
        <div class="num"><span class="count">0.00</span>元</div>
        <p class="text">我的余额</p>
      </div>
      <div class="info-item">
        <div class="num"><span class="count">0</span>个</div>
        <p class="text">我的优惠</p>
      </div>
      <div class="info-item">
        <div class="num"><span class="count">0</span>分</div>
        <p class="text">我的积分</p>
      </div>
    </section>
    <section class="profile-1reTe">
      <div class="myOrder">
        <div class="icon">
          <i class="el-icon-tickets"></i>
        </div>
        <div class="order-content">
          <p class="name">我的订单</p>
          <i class="icon-arrow-right"></i>
        </div>
      </div>
      <div class="myOrder">
        <div class="icon">
          <i class="el-icon-goods"></i>
        </div>
        <div class="order-content">
          <p class="name">积分商城</p>
          <i class="icon-arrow-right"></i>
        </div>
      </div>
      <div class="myOrder">
        <div class="icon">
          <i class="el-icon-rank"></i>
        </div>
        <div class="order-content">
          <p class="name">饿了么会员卡</p>
          <i class="icon-arrow-right"></i>
        </div>
      </div>
    </section>
    <section class="profile-1reTe">
      <div class="myOrder">
        <div class="icon">
          <i class="el-icon-menu"></i>
        </div>
        <div class="order-content">
          <p class="name">服务中心</p>
          <i class="icon-arrow-right"></i>
        </div>
      </div>
      <div class="myOrder">
        <div class="icon">
          <i class="el-icon-info"></i>
        </div>
        <div class="order-content">
          <p class="name">下载饿了么APP</p>
          <i class="icon-arrow-right"></i>
        </div>
      </div>
    </section>
    <tabs></tabs>
  </div>
</template>

<script>
  import Tabs from "../../components/tabs/tabs";
  import Split from "../../base/split/split";
  import PageHeader from "../../base/pageHeader/pageHeader";
  export default {
    name: '',
    components: {Split, Tabs, PageHeader},
    methods:{
      back(){
        this.$router.back();
      },
      login(){
        this.$router.push({
          path:'/login'
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";
.profile{
  width: 100%;
  background: $color-background;
  .header{
    width: 100%;
    height: 90px;
    background: $color-main;
    position: relative;
    .icon{
      position: absolute;
      padding: 20px;
      left: 0;
      top: 0;
      i{
        font-size: 36px;
        color: #fff;
        font-weight: 600;
      }
    }
    .title{
      line-height: 90px;
      width: 80%;
      text-align: center;
      margin: 0 auto;
      font-size: 36px;
      color: #fff;
      font-weight: 600;
    }
  }
  .profile-info{
    padding: 35px 30px;
    background: $color-main;
    display: flex;
    .privateImg{
      flex: 0 0 110px;
      width: 110px;
      height: 110px;
      border-radius: 50%;
      img{
        width: 110px;
        height: 110px;
        border-radius: 50%;
      }
    }
    .userInfo{
      flex: 1;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      p{
        color: #fff;
        &:first-child{
          font-size: 40px;
          margin-bottom: 20px;
          font-weight: 600;
        }
        &:last-child{
          i{
            font-size: 28px;
          }
          span{
            font-size: 24px;
            line-height: 28px;
          }
        }
      }
    }
    .arrow{
      display: flex;
      align-items: center;
      i{
        font-size: 28px;
        color: #fff;
        font-weight: 600;
      }
    }
  }
  .info-data{
    width: 100%;
    height: 170px;
    display: flex;
    background: #fff;
    .info-item{
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-right: 1px solid $color-border;
      &:first-child{
        .count{
          color: #f90;
        }
      }
      &:nth-of-type(2){
        .count{
          color: #f40;
        }
      }
      &:last-child{
        .count{
          color: #6ac20b;
        }
      }
      .num{
        font-size: 32px;
        color: $color-text;
        margin-bottom: 20px;
        .count{
          font-size: 55px;
          font-weight: 700;
        }
      }
      .text{
        font-size: 28px;
        color: $color-text;
      }
    }
  }
  .profile-1reTe{
    margin-top: 20px;
    .myOrder{
      display: flex;
      background: #fff;
      .icon{
        flex: 0 0 30px;
        margin: 0 20px 0 30px;
        display: flex;
        align-items: center;
        i{
          font-size: 32px;
          text-align: center;
        }
      }
      .order-content{
        flex: 1;
        border-bottom: 1px solid $color-border;
        display: flex;
        padding: 30px 20px 30px 0;
        align-items: center;
        .name{
          flex: 1;
          font-size: 32px;
          color: $color-text;
        }
      }
    }
  }
}
</style>

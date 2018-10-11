<template>
    <div class='mainHeader'>
      <div class="head-logo">
        <router-link to="/">ele.me</router-link>
      </div>
      <div class="head-login">
        <router-link to="/profile">
          <i class="icon-me"></i>
        </router-link>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'main-header'
    }
</script>

<style lang='scss' scoped>
@import "./../../assets/scss/variables";
  .mainHeader{
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 90px;
    background: $color-main;
    display: flex;
    justify-content: space-between;
    a{
      color: #fff;
    }
    .head-logo{
      display: flex;
      align-items: center;
      padding: 20px;
      a{
        font-size: 32px;
      }
    }
    .head-login{
      display: flex;
      align-items: center;
      padding: 20px;
      a{
        i{
          font-size: 40px;
        }
      }
    }
  }
</style>

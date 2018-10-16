<template>
  <div class='tabs'>
    <router-link tag="div" class="tab-item" :to="{path:'/msite',query:{geohash:geohash}}">
      <i class="icon-home"></i>
      <span class="text">外卖</span>
    </router-link>
    <router-link tag="div" class="tab-item" :to="'/search/'+geohash">
      <i class="icon-search"></i>
      <span class="text">搜索</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/order">
      <i class="icon-order"></i>
      <span class="text">订单</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/profile">
      <i class="icon-me"></i>
      <span class="text">我的</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'tabs',
    computed:{

    },
    data(){
      return{
        geohash:''
      }
    },
    mounted(){
      this.geohash = localStorage.getItem('__geoHash__');
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";
.tabs{
  width: 100%;
  height: 90px;
  background: #fff;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 2px solid #ccc;
  .tab-item{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    i{
      font-size: 36px;
      margin-bottom: 5px;
    }
    .text{
      font-size: 22px;
    }
    &.router-link-active{
      i{
        color: $color-main;
        font-weight: 700;
      }
      .text{
        color: $color-main;
        font-weight: 700;
      }
    }
  }
}
</style>

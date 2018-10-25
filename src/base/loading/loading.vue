<template>
  <div class='loading'>
    <div class="load-img" :style="{backgroundPositionY: -(positionY%7)*2.5 + 'rem'}"></div>
  </div>
</template>

<script>
  export default {
    name: '',
    data(){
      return{
        positionY:0,
        timer:null
      }
    },
    mounted(){
      this.timer = setInterval(()=>{
        this.positionY++;
      },600)
    },
    beforeDestroy(){
      clearInterval(this.timer);
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";
  @keyframes load{
    0%   {transform: translateY(0px);}
    50%  {transform: translateY(-50px);}
    100% {transform: translateY(0px);}
  }

  .loading{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2.5rem;
    height: 2.5rem;
    .load-img{
      width: 100%;
      height: 100%;
      background: url(./icon_loading.png) no-repeat 0 0;
      background-size: 2.5rem auto;
      transform: translateY(0px);
      animation: load .6s infinite ease-in-out;
      position: relative;
      z-index: 99;
    }
  }
</style>

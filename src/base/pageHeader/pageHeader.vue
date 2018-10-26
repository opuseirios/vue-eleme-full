<template>
  <div class='pageHeader'>
    <div class="icon" @click="back">
      <i class="icon-arrow-left"></i>
    </div>
    <h2 class="title">{{title}}</h2>
  </div>
</template>

<script>
  export default {
    name: '',
    props:{
      title:{
        type:String,
        default:''
      }
    },
    methods:{
      back(){
        this.$router.back();
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "../../assets/scss/variables";
  .pageHeader{
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
</style>

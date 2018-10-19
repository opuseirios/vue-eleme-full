<template>
  <div class='cart-control'>
    <transition name="move">
      <div class="cart-decrease" v-if="food&&food.count>0" @click.stop.prevent="decreaseCount">
        <i class="inner el-icon-remove" ></i>
      </div>
    </transition>
    <div class="cart-count" v-if="food&&food.count>0">{{food.count}}</div>
    <div class="el-icon-circle-plus" @click.stop.prevent="addCount" ref="addIcon"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: '',
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        count: 0
      }
    },
    methods:{
      addCount(){
        if(!this.food.count){
          Vue.set(this.food,'count',1)
        }else {
          this.food.count++;
        }
        this.$emit('add',this.$refs.addIcon);
      },
      decreaseCount(){
        this.food.count--;
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";

  .cart-control {
    font-size: 0;
    .cart-decrease{
      display: inline-block;
      padding: 0 6px;
      opacity: 1;
      transform: translate3d(0,0,0);
      .inner{
        display: inline-block;
        font-size: 36px;
        color: $color-main;
        transition: all .4s linear;
        transform: rotate(0);
      }
      &.move-enter-active,&.move-leave-active{
        transition: all .4s linear;
      }
      &.move-enter,&.move-leave-to{
        opacity: 0;
        transform: translate3d(24px,0,0);
        .inner{
          transform: rotate(180deg);
        }
      }
    }
    .cart-count {
      display: inline-block;
      vertical-align: top;
      width: 20px;
      line-height: 44px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }
    .el-icon-circle-plus {
      display: inline-block;
      padding: 6px;
      font-size: 36px;
      color: rgb(0, 160, 220);
    }
  }
</style>

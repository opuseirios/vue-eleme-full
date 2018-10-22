<template>
  <div class='spec-cart-control' v-if="food">
    <div class="el-icon-remove" @click.stop.prevent="decreaseCount" v-show="food.count>0"></div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="spec-btn" @click="selectSpec(food)">选规格</div>
  </div>
</template>

<script>

  export default {
    name: '',
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      decreaseCount() {
        this.$emit('decrease');
      },
      selectSpec(food) {
        this.$emit('select',food)
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";

  .spec-cart-control {
    font-size: 0;
    .el-icon-remove {
      display: inline-block;
      font-size: 36px;
      color: $color-text-bold;
    }
    .cart-count {
      display: inline-block;
      vertical-align: top;
      width: 30px;
      line-height: 44px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }
    .spec-btn {
      display: inline-block;
      font-size: 18px;
      color: #fff;
      background: $color-main;
      border-radius: 10px;
      padding: 0 10px;
      text-align: center;
    }
  }
</style>

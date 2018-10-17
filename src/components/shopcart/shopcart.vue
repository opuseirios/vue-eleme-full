<template>
  <div class='shopcart'>
    <div class="shopcart-content">
      <div class="cart-wrapper">
        <div class="cart">
          <i class="icon-cart"></i>
        </div>
      </div>
      <div class="totalPrice">¥ 0</div>
      <div class="desc">另需配送费¥{{delivery_fee}}元</div>
    </div>
    <div class="delivery_btn">
      ¥{{delivery_min_price}}起送
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      delivery_fee: {
        type: Number,
        default: 0
      },
      delivery_min_price: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";

  .shopcart {
    height: 96px;
    display: flex;
    .shopcart-content {
      flex: 1;
      position: relative;
      background: #141d27;
      color: rgba(255, 255, 255, .4);
      display: flex;
      .cart-wrapper {
        position: absolute;
        left: 24px;
        top: -20px;
        padding: 12px;
        z-index: 99;
        border-radius: 50%;
        background: #141d27;
        .cart {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: #2b343c;
          text-align: center;
          .icon-cart {
            font-size: 48px;
            line-height: 88px;
          }
        }
      }
      .totalPrice {
        padding-left: 160px;
        margin-top: 24px;
        font-size: 32px;
        height: 48px;
        font-weight: 700;
        line-height: 48px;
        padding-right: 25px;
        border-right: 2px solid rgba(255, 255, 255, .1);
      }
      .desc{
        padding-left: 25px;
        font-size: 24px;
        color: rgba(255,255,255,.4);
        font-weight: 200;
        line-height: 96px;
      }
    }
    .delivery_btn {
      flex: 0 0 210px;
      width: 210px;
      background: #2b333b;
      font-size: 24px;
      color: rgba(255,255,255,.4);
      font-weight: 700;
      line-height: 96px;
      text-align: center;
    }
  }
</style>

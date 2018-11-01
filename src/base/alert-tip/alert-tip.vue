<template>

  <div class='alert-tip' v-show="showFlag">
    <div class="tip-container">
      <div class="tip-icon">
        <span></span>
        <span></span>
      </div>
      <p class="tip-text">{{tipText}}</p>
      <div class="confirm" @click="closeTip">确定</div>
    </div>
  </div>


</template>

<script>
  export default {
    name: '',
    props: {
      tipText: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      closeTip() {
        this.showFlag = false;
      },
      show() {
        this.showFlag = true;
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";

  .alert-tip {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;

    .tip-container {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 560px;
      margin-left: -260px;
      margin-top: -200px;
      border-radius: 10px;
      overflow: hidden;
      background: #fff;
      animation: tip .4s linear;
      .tip-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 50%;
        border: 5px solid #f8cb86;
        width: 140px;
        height: 140px;
        margin: 40px auto;
        span {
          background: #f8cb86;
          &:nth-of-type(1) {
            width: 8px;
            height: 80px;
            margin-bottom: 20px;
          }
          &:nth-of-type(2) {
            width: 8px;
            height: 8px;
            border-radius: 50%;
          }
        }
      }
      .tip-text {
        margin-bottom: 20px;
        text-align: center;
        font-size: 26px;
        color: $color-text;
      }
      .confirm {
        width: 100%;
        height: 80px;
        line-height: 80px;
        text-align: center;
        color: #fff;
        background: $color-sub;
        font-size: 32px;
        font-weight: 700;
      }
    }
  }

  @keyframes tip {
    0% {
      transform: scale(1);
    }
    40% {
      transform: scale(0.8);
    }
    70% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>

<template>
  <div class='confirm' v-show="showFlag">
    <div class="confirm-container">
      <div class="alert-icon">
        <span></span>
        <span></span>
      </div>
      <p class="confirm-text">{{confirmText}}</p>
      <div class="btn-group">
        <div class="btn" @click="cancel">{{cancelBtnText}}</div>
        <div class="btn right" @click="confirm">{{confirmBtnText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      confirmText: {
        type: String,
        default: ''
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      },
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      confirm() {
        this.showFlag = false;
        this.$emit('confirm');
      },
      show() {
        this.showFlag = true;
      },
      hide() {
        this.showFlag = false;
      },
      cancel() {
        this.showFlag = false;
        this.$emit('cancel');
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";

  .confirm {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background: rgba(0,0,0,0.4);
    .confirm-container {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 560px;
      margin-left: -260px;
      margin-top: -260px;
      border-radius: 10px;
      overflow: hidden;
      background: #fff;
      animation: tip .4s linear;
      .alert-icon {
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
      .confirm-text {
        line-height: 100px;
        text-align: center;
        font-size: 50px;
        font-weight: 600;
        color: $color-text;
      }
      .btn-group {
        margin-top: 120px;
        width: 100%;
        display: flex;
        height: 80px;
        align-items: center;
        .btn {
          flex: 1;
          height: 80px;
          line-height: 80px;
          text-align: center;
          background: $color-text-bold;
          font-size: 32px;
          font-weight: 500;
          color: #fff;
          &.right {
            background: #f40;
          }
        }
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

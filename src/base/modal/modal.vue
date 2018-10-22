<template>
  <transition name="confirm-fade">
    <div class='modal' v-show="showFlag">
      <div class="modal-container">
        <div class="modal-content">
          <p class="text">{{text}}</p>
          <div class="operate">
            <div class="operate-btn left" @click="cancel">{{cancelBtnText}}</div>
            <div class="operate-btn" @click="confirm">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: '',
    props: {
      text: {
        type: String,
        default: ''
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      },
      confirmBtnText: {
        type: String,
        default: "确定"
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true;
      },
      hide() {
        this.showFlag = false;
      },
      confirm(){
        this.hide();
        this.$emit('confirm')
      },
      cancel(){
        this.hide();
        this.$emit('cancel')
      }
    }
  }
</script>

<style lang='scss' scoped>
@import "./../../assets/scss/variables";
  .modal{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0,0,0,.5);
    &.confirm-fade-enter-active{
      animation: confirm-fadein 0.3s;
      .confirm-content{
        animation: confirm-zoom 0.3s;
      }
    }
    .modal-container{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      z-index: 199;
      .modal-content{
        width: 540px;
        border-radius: 26px;
        background: #fff;
        .text{
          padding: 40px 30px;
          line-height: 44px;
          text-align: center;
          font-size: 32px;
          color: $color-text;
        }
        .operate{
          display: flex;
          align-items: center;
          font-size: 32px;
          text-align: center;
          .operate-btn{
            flex: 1;
            line-height: 40px;
            padding: 20px 0;
            color:$color-main;
          }
        }
      }
    }
  }

  @keyframes confirm-fadein {
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  @keyframes confirm-zoom {
    0%{
      transform: scale(0);
    }
    50%{
      transform: scale(1.1);
    }
    100%{
      transform: scale(1);
    }
  }
</style>

<template>
  <div class='spec' v-show="showFlag" @click="hide">
    <div class="spec-wrapper">
      <div class="spec-header">
        <div class="close" @click.stop.prevent="hide">
          <i class="el-icon-close"></i>
        </div>
        <h4 class="name">{{name}}</h4>
      </div>
      <div class="spec-content">
        <h5 class="title">{{specs.name}}</h5>
        <ul>
          <li class="spec-item" :class="{'active':currentIndex===index}" v-for="(item,index) in specs.values"
              @click.stop.prevent="changeItem(item,index)">{{item}}
          </li>
        </ul>
      </div>
      <div class="spec-footer">
        <p class="price"><i class="rmb">¥</i>{{price}}</p>
        <div class="add-btn" @click="addCart">加入购物车</div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: '',
    props: {
      name: {
        type: String,
        default: ''
      },
      specs: {
        type: Object,
        default: null
      },
      price: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        showFlag: false,
        currentIndex: 0,
      }
    },
    mounted() {
      this.selectSpec = this.specs.values[0];
    },
    methods: {
      show() {
        this.showFlag = true;
      },
      hide() {
        this.showFlag = false;
      },
      changeItem(item, index) {
        this.selectSpec = item;
        this.currentIndex = index;
      },
      addCart(){
        this.$emit('addSpec',this.selectSpec);
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";

  .spec {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    background: rgba(0, 0, 0, .3);
    .spec-wrapper {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 70%;
      background: #fff;
      border-radius: 10px;
      .spec-header {
        position: relative;
        .name {
          font-size: 36px;
          color: $color-text;
          text-align: center;
          padding: 20px;
        }
        .close {
          position: absolute;
          right: 0;
          top: 0;
          padding: 20px;
          .el-icon-close {
            font-size: 26px;
            font-weight: 500;
            color: $color-text;
          }
        }
      }
      .spec-content {
        padding: 20px 20px 80px 20px;
        .title {
          font-size: 22px;
          color: $color-text;
        }
        ul {
          padding: 20px 0;
          .spec-item {
            float: left;
            margin-right: 20px;
            font-size: 22px;
            padding: 20px;
            color: $color-text;
            border: 2px solid $color-text-bold;
            border-radius: 10px;
            &.active {
              color: $color-main;
              border-color: $color-main;
            }
          }
        }
      }
      .spec-footer {
        display: flex;
        justify-content: space-between;
        padding: 30px;
        align-items: center;
        background: $color-background;
        .price {
          font-size: 36px;
          font-weight: 700;
          color: #ff6000;
          i {
            font-size: 22px;
          }
        }
        .add-btn {
          width: 200px;
          height: 60px;
          border-radius: 10px;
          text-align: center;
          line-height: 60px;
          color: #fff;
          background: $color-main;
        }
      }
    }
  }
</style>

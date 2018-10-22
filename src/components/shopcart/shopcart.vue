<template>
  <div class='shopcart'>
    <div class="shortcart-container">
      <div class="shopcart-content" @click="toggleFlag">
        <div class="cart-wrapper">
          <div class="cart" :class="{'active':totalPrice>0}">
            <i class="icon-cart"></i>
            <i class="num" v-show="totalNum>0">{{totalNum}}</i>
          </div>
        </div>
        <div class="totalPrice" :class="{'active':totalPrice>0}">¥ {{totalPrice}}</div>
        <div class="desc" :class="{'active':totalPrice>0}">另需配送费¥{{delivery_fee}}元</div>
      </div>
      <div class="delivery_btn" :class="{'active':this.totalPrice>=this.delivery_min_price}">
        {{payStatus}}
      </div>
    </div>
    <div class="ball-container">
        <div v-for="(ball,index) in balls" :key="index">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
          </transition>
        </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="showFlag&&selectFoods.length>0">
        <div class="list-header">
          <h2 class="title">购物车</h2>
          <span class="empty" @click="clearAllFood"><i class="el-icon-delete"></i>&nbsp;清空</span>
        </div>
        <scroll class="list-content" :data="selectFoods" ref="listContent">
          <ul>
            <transition-group name="slide">
              <li class="food" v-for="(food,index) in selectFoods" :key="index+food.name">
                <div class="name"><span>{{food.name}}</span><span class="spec" v-show="food.spec">{{food.spec}}</span></div>
                <span class="price"><i>¥</i>{{food.specfoods[0].price}}</span>
                <div class="cart-control-wrapper">
                  <cart-control :food="food" @add="addFood" @decrease="decreaseFood"></cart-control>
                </div>
              </li>
            </transition-group>
          </ul>
        </scroll>
      </div>
    </transition>
    <transition name="fade">
      <div class="list-mask"  v-show="showFlag&&selectFoods.length>0" @click="hide"></div>
    </transition>
    <modal ref="modal" @confirm="confirm" text="清除购物车"></modal>
  </div>
</template>

<script>
  import CartControl from './../../base/cart-control/cart-control'
  import Scroll from './../../base/scroll/scroll'
  import Modal from './../../base/modal/modal'

  export default {
    name: '',
    components:{CartControl,Scroll,Modal},
    props: {
      selectFoods: {
        type: Array
      },
      delivery_fee: {
        type: Number,
        default: 0
      },
      delivery_min_price: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        showFlag:false
      }
    },
    computed:{
      totalPrice(){
        let sum = 0;
        if(!this.selectFoods){
          return;
        }
        this.selectFoods.forEach((food)=>{
          sum+=parseInt(food.specfoods[0].price)*food.count;
        })
        return sum;
      },
      totalNum(){
        let num = 0;
        if(!this.selectFoods){
          return;
        }
        this.selectFoods.forEach((food)=>{
          num+=food.count;
        })
        return num;
      },
      payStatus(){
        if(this.totalPrice === 0){
          return `¥${this.delivery_min_price}起送`
        }else if(this.totalPrice<this.delivery_min_price){
          return `还剩${this.delivery_min_price-this.totalPrice}元起送`
        }else {
          return '去结算'
        }
      }
    },
    methods: {
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      addFood(event){
        this.drop(event);
      },
      decreaseFood(){
        if(this.selectFoods.length === 0){
          this.showFlag = false;
        }
      },
      clearAllFood(){
        this.$refs.modal.show();
      },
      confirm(){
        this.selectFoods.forEach((food)=>{
          food.count = 0;
        })
      },
      beforeDrop(el) {
        let count = this.balls.length;
        while (count--){
          let ball = this.balls[count];
          if(ball.show){
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left-32;
            let y = -(window.innerHeight-rect.top-22);
            el.style.display = '';
            el.style.transform = `translate3d(0,${y}px,0`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      dropping(el,done) {
        let rf = el.offsetHeight;
        this.$nextTick(()=>{
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.transform = `translate3d(0,0,0)`
          el.addEventListener('transitionend',done)
        })
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if(ball){
          ball.show = false;
          el.style.display = 'none';
        }
      },
      toggleFlag(){
        this.showFlag = !this.showFlag;
        setTimeout(()=>{
          this.$refs.listContent.refresh();
        },20)
      },
      hide(){
        this.showFlag = false;
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";

  .shopcart {
    height: 96px;
    position: relative;
    .shortcart-container{
      display: flex;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: 99;
    }
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
          position: relative;
          .icon-cart {
            font-size: 48px;
            line-height: 88px;
          }
          .num{
            position: absolute;
            width: 30px;
            height: 30px;
            background: red;
            color: #fff;
            border-radius: 50%;
            font-size: 14px;
            line-height: 30px;
            text-align: center;
            right: -2px;
            top: -2px;
            font-style: normal;
          }
          &.active{
            background: $color-main;
            .icon-cart{
              color: #fff;
            }
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
        &.active{
          color: #fff;
        }
      }
      .desc {
        padding-left: 25px;
        font-size: 24px;
        color: rgba(255, 255, 255, .4);
        font-weight: 200;
        line-height: 96px;
        &.active{
          color: #fff;
        }
      }
    }
    .delivery_btn {
      flex: 0 0 210px;
      width: 210px;
      background: #2b333b;
      font-size: 24px;
      color: rgba(255, 255, 255, .4);
      font-weight: 700;
      line-height: 96px;
      text-align: center;
      &.active{
        color: #fff;
        background: #4cd964;
      }
    }
  }
  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 32px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(0, 160, 220);
        transition: all 0.4s linear;
      }
    }
  }
  .list-mask{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 96px;
    background:rgba(0,0,0,.4);
    opacity: 1;
    &.fade-enter-active,&.fade-leave-active{
      transition: all .4s;
    }
    &.fade-enter,&.fade-leave-to{
      opacity: 0;
    }
  }
  .shopcart-list{
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 1;
    bottom: 96px;
    overflow: hidden;
    background: #fff;
    &.fold-enter-active,&.fold-leave-active{
      transition: all .4s;
    }
    &.fold-enter,&.fold-leave-to{
      transform: translate3d(0,100%,0);
    }
    .list-header{
      display: flex;
      padding: 10px 20px;
      background: $color-background;
      justify-content: space-between;
      align-items: center;
      .title{
        line-height: 50px;
        font-size: 28px;
        color: $color-text;
      }
      .empty{
        line-height: 50px;
        font-size: 26px;
        color: $color-text-bold;
        i{
          font-size: 26px;
        }
      }
    }
    .list-content{
      max-height: 500px;
      overflow: hidden;
      ul{

      }
      .food{
        height: 100px;
        display: flex;
        padding: 10px 20px;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        position: relative;
        border-bottom: 1px solid #ccc;
        &:last-child{
          border-bottom: none;
        }
        &.slide-enter-active,.slide-leave-active{
          transition: all .2s;
        }
        &.slide-enter,&.slide-leave-to{
          height: 0;
        }
        .name{
          display: flex;
          flex-direction: column;
          font-size:28px;
          font-weight: 600;
          color: $color-text;
          .spec{
            margin-top: 10px;
          }
        }
        .price{
          font-size: 28px;
          font-weight: 500;
          color: rgb(240,20,20);
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 300px;
          i{
            font-size: 22px;
            font-style: normal;
          }
        }
      }
    }
  }
</style>

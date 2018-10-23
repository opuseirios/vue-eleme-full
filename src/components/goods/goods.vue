<template>
  <div class='goods'>
    <div class="goods-container">
      <scroll class="good-menu" :data="goodMenu">
        <ul>
          <li class="menu-item" v-for="(item,index) in goodMenu" :class="{'active':index===currentIndex}"
              @click="selectItem(item,index)">
            {{item}}
          </li>
        </ul>
      </scroll>
      <scroll class="good-content"
              :probe-type="probeType"
              :listen-scroll="listenScroll"
              :data="foodList"
              ref="goodContent"
              @scroll="scroll"
      >
        <ul>
          <li class="item" v-for="item in foodList" ref="foodGroup">
            <h4 class="title">{{item.name}} <span class="subTitle">{{item.description}}</span></h4>
            <ul>
              <li class="food-item" v-for="food in item.foods">
                <div class="icon">
                  <img :src="'http://elm.cangdu.org/img/'+food.image_path" alt="">
                </div>
                <div class="content">
                  <h4 class="name">{{food.name}} <i class="feature" v-if="food.attributes.length">招牌</i></h4>
                  <p class="desc">{{food.description}}</p>
                  <p class="sell">月售{{food.rating_count}}份&nbsp;&nbsp;好评率{{food.satisfy_rate}}%</p>
                  <span class="activity" v-if="food.activity">{{food.activity.image_text}}</span>
                  <div class="price" v-if="!food.specifications.length">
                    <div>¥<span class="num">{{food.specfoods[0].price}}</span></div>
                    <div class="cart-control-wrapper">
                      <cart-control :food="food" @add="add($event,food)"></cart-control>
                    </div>
                  </div>
                  <div class="price" v-if="food.specifications.length">
                    <div>¥<span class="num">{{food.specfoods[0].price}}</span> <span style="color: #333;">起</span></div>
                    <div class="cart-control-wrapper">
                      <spec-cart-control :food="food" @select="selectSpec" @decrease="decreaseSpec"></spec-cart-control>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </scroll>
    </div>
    <div class="shopcart-wrapper" v-if="shopDetail">
      <shop-cart ref="shopcart" :delivery_fee="shopDetail.float_delivery_fee"
                 :delivery_min_price="shopDetail.float_minimum_order_amount" :select-foods="selectFoods"></shop-cart>
    </div>
    <spec v-if="selectFood"
          :name="selectFood.name"
          :specs="selectFood.specifications[0]"
          :price="selectFood.specfoods[0].price"
          @addSpec="addSpec"
          ref="spec">
    </spec>
    <tip text="多规格商品只能去购物车删除哦" ref="tip"></tip>
  </div>
</template>

<script>
  import axios from 'axios';
  import Scroll from './../../base/scroll/scroll'
  import CartControl from './../../base/cart-control/cart-control'
  import SpecCartControl from './../../base/spec-cart-control/spec-cart-control'
  import ShopCart from './../../components/shopcart/shopcart'
  import Spec from './../../base/spec/spec'
  import Tip from './../../base/tip/tip'
  import Vue from 'vue'
  export default {
    name: '',
    components: {Scroll, CartControl, ShopCart, SpecCartControl, Spec, Tip},
    props: {
      shopId: {
        type: Number,
        default: -1
      },
      shopDetail: {
        type: Object
      }
    },
    data() {
      return {
        foodList: [],
        currentIndex: 0,
        scrollY: -1,
        heightArray: [],
        selectFood: null
      }
    },
    created() {
      this.probeType = 3;
      this.listenScroll = true;
      this.$nextTick(() => {
        this._getFoodList();
      })
    },
    computed: {
      goodMenu() {
        let menu = [];
        if (!this.foodList.length) {
          return
        }
        this.foodList.forEach((item) => {
          menu.push(item.name)
        })
        return menu;
      },
      selectFoods() {
        let foods = [];
        if (!this.foodList.length) {
          return
        }
        for (let i = 0; i < this.foodList.length; i++) {
          let foodGroup = this.foodList[i].foods;
          for (let j = 0; j < foodGroup.length; j++) {
            let food = foodGroup[j];
            if (food.count >= 1) {
              foods.push(food);
            }
          }

        }
        return foods;
      }
    },
    methods: {
      selectItem(item, index) {
        this.$refs.goodContent.scrollToElement(this.$refs.foodGroup[index], 400);
      },
      scroll(pos) {
        this.scrollY = pos.y;
      },
      add(event, food) {
        this._drop(event);
      },
      selectSpec(food) {
        this.selectFood = food;
        setTimeout(() => {
          this.$refs.spec.show();
        }, 20)
      },
      addSpec(specItem) {
        if(!this.selectFood.count){
          Vue.set(this.selectFood,'count',1)
          Vue.set(this.selectFood,'spec',specItem);
        }else {
          this.selectFood.count++;
        }
      },
      decreaseSpec(){
        this.$refs.tip.show();
      },
      _drop(event) {
        this.$nextTick(() => {
          this.$refs.shopcart.drop(event);
        })
      },
      _getFoodList() {
        axios.get(`https://elm.cangdu.org/shopping/v2/menu?restaurant_id=${this.shopId}`)
          .then((res) => {
            if (res.status === 200) {
              this.foodList = res.data;
            }
          })
      },
      _calculateHeight() {
        let height = 0;
        this.heightArray.push(height);
        if(this.$refs.foodGroup.length){
          this.$refs.foodGroup.forEach((item) => {
            height += item.clientHeight;
            this.heightArray.push(height);
          })
        }
      },
    },
    watch: {
      foodList() {
        setTimeout(() => {
          this._calculateHeight();
        }, 20)
      },
      scrollY(newY) {
        let heights = this.heightArray.slice();
        if (newY > 0) {
          return 0
        }
        for (let i = 0; i < heights.length; i++) {
          let height1 = heights[i];
          let height2 = heights[i + 1];
          if ((-newY >= height1 && -newY < height2)) {
            this.currentIndex = i;
            return
          }
        }
        this.currentIndex = heights.length - 2;
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";

  .goods {
    height: 100%;
    .goods-container {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 96px;
      overflow: hidden;
    }
    .good-menu {
      flex: 0 0 160px;
      width: 160px;
      .menu-item {
        width: 160px;
        height: 108px;
        background: #f3f5f7;
        font-size: 24px;
        line-height: 108px;
        color: $color-text;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #ddd;
        &:last-child {
          border-bottom: none;
        }
        &.active {
          font-weight: 600;
          background: #fff;
          &::before {
            content: '';
            position: absolute;
            display: block;
            left: 0;
            top: 0;
            width: 10px;
            height: 100%;
            background: $color-main;
          }
        }
      }
    }
    .good-content {
      flex: 1;
      background: #fff;
      .item {
        .title {
          height: 80px;
          line-height: 80px;
          background: #f3f5f7;
          padding-left: 28px;
          font-size: 32px;
          color: $color-text;
          font-weight: 600;
          .subTitle {
            margin-left: 20px;
            font-size: 24px;
            font-weight: normal;
            color: $color-text-bold;
          }
        }
        .food-item {
          padding: 36px 0;
          margin: 0 36px;
          display: flex;
          .icon {
            flex: 0 0 128px;
            width: 128px;
            height: 128px;
            img {
              width: 100%;
            }
          }
          .content {
            flex: 1;
            margin-left: 20px;
            .name {
              padding-top: 4px;
              font-size: 28px;
              color: rgb(7, 17, 27);
              font-weight: 600;
              display: flex;
              justify-content: space-between;
              .feature {
                font-style: normal;
                font-size: 10px;
                padding: 4px;
                border: 2px solid rgb(240, 20, 20);
                color: rgb(240, 20, 20);
                border-radius: 20px;
              }
            }
            .desc {
              font-size: 20px;
              color: $color-text-bold;
              margin: 16px 0;
            }
            .sell {
              font-size: 20px;
              color: $color-text;
            }
            .activity {
              margin-top: 10px;
              display: inline-block;
              font-size: 12px;
              color: rgb(241, 136, 79);
              border: 2px solid rgb(240, 20, 20);
              padding: 4px;
              border-radius: 20px;
            }
            .price {
              font-size: 20px;
              color: rgb(240, 20, 20);
              line-height: 48px;
              display: flex;
              justify-content: space-between;
              .num {
                font-size: 28px;
                font-weight: 700;
              }
              .cart-control-wrapper {

              }
            }
          }
        }
      }
    }
    .shopcart-wrapper {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
</style>

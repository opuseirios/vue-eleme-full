<template>
  <div class='goods'>
    <scroll class="good-menu" :data="goodMenu">
      <ul>
        <li class="menu-item" v-for="(item,index) in goodMenu" :class="{'active':index===0}">
          {{item}}
        </li>
      </ul>
    </scroll>
    <scroll class="good-content" :data="foodList">
      <ul>
        <li class="item" v-for="item in foodList">
          <h4 class="title">{{item.name}} <span class="subTitle">{{item.description}}</span></h4>
          <ul>
            <li class="food-item" v-for="food in item.foods">
              <div class="icon">
                <img :src="'http://elm.cangdu.org/img/'+food.image_path" alt="">
              </div>
              <div class="content">
                <h4 class="name">{{food.name}}</h4>
                <p class="desc">{{food.description}}</p>
                <p class="sell">月售{{food.rating_count}}份&nbsp;&nbsp;好评率{{food.satisfy_rate}}%</p>
                <div class="price">¥<span class="num">{{food.specfoods[0].price}}</span></div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
  import axios from 'axios';
  import Scroll from './../../base/scroll/scroll'

  export default {
    name: '',
    components: {Scroll},
    props: {
      shopId: {
        type: String,
        default: "-1"
      }
    },
    data() {
      return {
        foodList: []
      }
    },
    mounted() {
      this._getFoodList();
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
      }
    },
    methods: {
      _getFoodList() {
        axios.get(`https://elm.cangdu.org/shopping/v2/menu?restaurant_id=${this.shopId}`)
          .then((res) => {
            if (res.status === 200) {
              this.foodList = res.data;
              console.log(this.foodList);
            }
          })
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";

  .goods {
    height: 100%;
    overflow: hidden;
    display: flex;
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
            .price {
              font-size: 20px;
              color: rgb(240, 20, 20);
              line-height: 48px;
              .num {
                font-size: 28px;
                font-weight: 700;
              }
            }
          }
        }
      }
    }
  }
</style>

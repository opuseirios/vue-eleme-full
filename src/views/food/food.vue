<template>
  <slide>
    <div class='food'>
      <header class="food-header">
        <div class="icon" @click="back">
          <i class="icon-arrow-left"></i>
        </div>
        <h3 class="title">{{title}}</h3>
      </header>
      <nav class="category">
        <div class="category-item type" :class="{'active':typeFlag}"
             @click="typeFlag=!typeFlag;sortFlag=false;filterFlag=false">
          <div class="item-title">
            <span class="name">{{itemTitle}} <i class="icon-arrow-down"></i></span>
          </div>
          <transition name="slide">
            <section class="item-content" v-show="typeFlag">
              <ul class="level1">
                <li class="item" :class="{'active':currentIndex===index}" v-for="(item,index) in items"
                    @click.stop="selectItem(item,index)">
                  <div class="name">
                    <img class="img" :src="_getImg(item.image_url)" alt=""><span>{{item.name}}</span>
                  </div>
                  <div><span class="count">{{item.count}}</span> <i class="icon-arrow-right"></i></div>
                </li>
              </ul>
              <scroll class="level2" :data="subItems">
                <ul>
                  <li class="level2-item" v-for="subItem in subItems" v-show="subItems.length>0">
                    <span>{{subItem.name}}</span>
                    <span>{{subItem.count}}</span>
                  </li>
                </ul>
              </scroll>
            </section>
          </transition>

        </div>
        <div class="category-item" :class="{'active':sortFlag}"
             @click="sortFlag=!sortFlag;typeFlag=false;filterFlag=false">
          <div class="item-title">
            <span class="name">排序 <i class="icon-arrow-down"></i></span>
          </div>
          <transition name="slide">
            <section class="item-content" v-show="sortFlag">
              <ul class="sortUl">
                <li class="item">
                  <i class="el-icon-sort"></i>
                  <span class="text">智能排序</span>
                </li>
                <li class="item">
                  <i class="el-icon-location"></i>
                  <span class="text">距离最近</span>
                </li>
                <li class="item">
                  <i class="el-icon-bell"></i>
                  <span class="text">销量最高</span>
                </li>
                <li class="item">
                  <i class="el-icon-goods"></i>
                  <span class="text">配送价最低</span>
                </li>
                <li class="item">
                  <i class="el-icon-time"></i>
                  <span class="text">配送时间最快</span>
                </li>
                <li class="item">
                  <i class="el-icon-star-on"></i>
                  <span class="text">评分最高</span>
                </li>
              </ul>
            </section>
          </transition>
        </div>
        <div class="category-item" :class="{'active':filterFlag}"
             @click="filterFlag=!filterFlag;typeFlag=false;sortFlag=false;">
          <div class="item-title">
            <span class="name">筛选 <i class="icon-arrow-down"></i></span>
          </div>
          <transition name="slide">
            <section class="item-content filter-content" v-show="filterFlag">
              <div class="ul-wrapper">
                <h4 class="title">配送方式</h4>
                <ul>
                  <li class="item" :class="{'check':item.checked===1}" v-for="item in delivery" @click.stop="selectSupport(item)">
                    <i v-show="item.checked===1" class="el-icon-check"></i><i v-show="item.checked!==1" class="icon-name">蜂</i><span>{{item.text}}</span>
                  </li>
                </ul>
              </div>
              <div class="ul-wrapper">
                <h4 class="title">商家属性（可以多选）</h4>
                <ul>
                  <li class="item" :class="{'check':attr.checked===1}" v-for="attr in activity_attrs" @click.stop="selectSupport(attr)">
                    <i v-show="attr.checked===1" class="el-icon-check"></i><i v-show="attr.checked!==1" class="icon-name" :style="{color:'#'+attr.icon_color,borderColor:'#'+attr.icon_color}">{{attr.icon_name}}</i>{{attr.name}}
                  </li>
                </ul>
              </div>
              <div class="btn-wrapper">
                <div class="btn">清空</div>
                <div class="btn confirm">确定 <span v-show="checkedAttrs.length>0">({{checkedAttrs.length}})</span></div>
              </div>
            </section>
          </transition>
        </div>
        <transition name="fade">
          <div class="back-cover" v-show="typeFlag||filterFlag||sortFlag"></div>
        </transition>
      </nav>
      <scroll class="food-content">
        <ul>
          <li class="item" v-for="item in restaurants">
            <div class="icon">
              <img :src="'http://elm.cangdu.org/img/'+item.image_path" alt="">
            </div>
            <div class="content">
              <header class="item-header">
                <h4 class="title">
                  <i class="brand" v-show="item.is_premium"></i>
                  <span class="name">{{item.name}}</span>
                </h4>
                <ul class="shop-supports" v-if="item.supports">
                  <li class="support" v-for="support in item.supports">{{support.icon_name}}</li>
                </ul>
              </header>
              <div class="sell-info">
                <section class="info-section">
                  <div class="star-wrapper">
                    <star :score="item.rating" size="48"></star>
                  </div>
                  <span class="score">{{item.rating}}</span>
                  <span class="sell">月售{{item.recent_order_num}}</span>
                </section>
                <section class="info-section">
                  <div class="delivery-mode" v-show="item.delivery_mode">
                    <span>蜂鸟专送</span>
                    <span class="zsd">准时达</span>
                  </div>
                </section>
              </div>
              <div class="delivery-info">
                <div class="left">
                  <span>¥{{item.float_minimum_order_amount}}起送</span>/<span>{{item.piecewise_agent_fee.tips}}</span>
                </div>
                <div class="right">
                  <span>{{item.distance}}</span>/<span class="time">{{item.order_lead_time}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
  </slide>

</template>

<script>
  import Slide from './../../base/slide/slide'
  import Scroll from './../../base/scroll/scroll'
  import Star from './../../base/star/star'
  import axios from 'axios'
  import Vue from 'vue'

  export default {
    name: '',
    components: {Slide, Scroll, Star},
    created() {
      this.geohash = this.$route.query.geohash;
      this.latitude = this.geohash.split(',')[0];
      this.longitude = this.geohash.split(',')[1];
      this.title = this.$route.query.title;
      this.restaurant_category_id = this.$route.query.restaurant_category_id;
    },
    mounted() {
      this._getRestaurant();
      this._getCategory();
      this._getActivityAttrs();
      this._getDelivery();
      setTimeout(() => {
        this._initLevel();
      }, 30)
    },
    computed: {
      itemTitle() {
        return !this.typeFlag ? this.title : '分类'
      },
    },
    data() {
      return {
        items: [],
        currentIndex: 0,
        subItems: [],
        typeFlag: false,
        sortFlag: false,
        filterFlag: false,
        restaurants: [],
        checkedAttrs: [],
        activity_attrs: null,
        delivery: null
      }
    },
    methods: {
      back() {
        this.$router.back();
      },
      selectItem(item, index) {
        this.subItems = item.sub_categories;
        this.currentIndex = index;
      },
      selectSupport(item){
        if(!item.checked){
          Vue.set(item,'checked',1)
        }else {
          item.checked = -item.checked;
        }
        if(item.checked === 1){
          this.checkedAttrs.push(item);
        }else if(item.checked === -1){
          const index = this.checkedAttrs.findIndex((attr)=>{
            return attr.id === item.id;
          })
          this.checkedAttrs.splice(index,1);
        }
      },
      _getRestaurant() {
        axios.get('https://elm.cangdu.org/shopping/restaurants', {
          params: {
            latitude: this.latitude,
            longitude: this.longitude,
            offset: 0,
            limit: 20,
            restaurant_category_id: this.restaurant_category_id
          }
        }).then((res) => {
          this.restaurants = res.data;
        })
      },
      _getCategory() {
        axios.get('https://elm.cangdu.org/shopping/v2/restaurant/category', {
          params: {
            latitude: this.latitude,
            longitude: this.longitude
          }
        }).then((res) => {
          this.items = res.data;
        })
      },
      _getActivityAttrs() {
        axios.get('https://elm.cangdu.org/shopping/v1/restaurants/activity_attributes')
          .then((res) => {
            this.activity_attrs = res.data;
          })
      },
      _getDelivery() {
        axios.get('https://elm.cangdu.org/shopping/v1/restaurants/delivery_modes')
          .then((res) => {
            this.delivery = res.data;
          })
      },
      _initLevel() {
        if (!this.items.length) {
          return;
        }
        const index = this.items.findIndex((item) => {
          return item.name === this.title;
        })
        this.currentIndex = index;
        this.subItems = this.items[index].sub_categories;
      },
      _getImg(src) {
        if (!src) {
          return 'http://elm.cangdu.org/img/default.jpg'
        }
        const reg = new RegExp('jpeg');
        return reg.test(src) ? `https://fuss10.elemecdn.com/${src.slice(0, 1)}/${src.slice(1, 3)}/${src.slice(3)}.jpeg` : `https://fuss10.elemecdn.com/${src.slice(0, 1)}/${src.slice(1, 3)}/${src.slice(3)}.png`
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";
  @import "./../../assets/scss/mixin";

  .food {
    .food-header {
      height: 90px;
      background: $color-main;
      position: relative;
      color: #fff;
      z-index: 11;
      .icon {
        position: absolute;
        padding: 20px;
        left: 0;
        top: 0;
        i {
          font-size: 32px;
          line-height: 50px;
          font-weight: 600;
        }
      }
      .title {
        width: 80%;
        text-align: center;
        line-height: 90px;
        font-size: 36px;
        font-weight: 700;
        margin: 0 auto;
      }
    }
    .category {
      position: relative;
      display: flex;
      height: 75px;
      box-sizing: border-box;
      background: #fff;
      border-bottom: 1px solid $color-border;
      .category-item {
        flex: 1;
        width: 100%;
        padding: 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid $color-border;
        transition: all .3s;
        background: #fff;
        z-index: 12;
        .item-title {
          .name {
            font-size: 24px;
            color: $color-text;
          }
          .icon-arrow-down {
            color: $color-text;
            transform: rotate(0);
          }
        }
        &.active {
          .item-title {
            .name {
              color: $color-main;
            }
            .icon-arrow-down {
              display: inline-block;
              color: $color-main;
              transition: all .3s;
              transform: rotate(180deg);
            }
          }
        }
        &:last-child {
          border-right: none;
        }
        .name {
          font-size: 24px;
          color: $color-text;
          .img {
            width: 36px;
            height: 36px;
            vertical-align: middle;
            margin-right: 10px;
          }
        }
        .count {
          padding: 5px;
          border-radius: 10px;
          background: #999;
          color: #fff;
        }
        .item-content {
          position: absolute;
          left: 0;
          right: 0;
          top: 76px;
          display: flex;
          height: 780px;
          overflow: hidden;
          z-index: 11;
          &.slide-enter-active, &.slide-leave-active {
            transition: all .3s;
          }
          &.slide-enter, &.slide-leave-to {
            height: 0;
          }
          .level1 {
            flex: 1;
            background: $color-background;
            .item {
              background: $color-background;
              padding: 25px 20px;
              display: flex;
              justify-content: space-between;
              color: $color-text;
              &.active {
                background: #fff;
              }
            }
          }
          .level2 {
            flex: 1;
            overflow: hidden;
            background: #fff;
            .level2-item {
              padding: 25px 0;
              margin: 0 20px;
              border-bottom: 1px solid $color-border;
              display: flex;
              justify-content: space-between;
              font-size: 26px;
              color: $color-text;
            }
          }
          .sortUl {
            width: 100%;
            .item {
              background: #fff;
              height: 130px;
              display: flex;
              align-items: center;
              padding: 0 20px;
              box-sizing: border-box;
              > i {
                margin-left: 20px;
                font-size: 30px;
              }
              .text {
                flex: 1;
                line-height: 140px;
                margin-left: 20px;
                font-size: 26px;
                border-bottom: 1px solid $color-border;
              }
            }
          }
          &.filter-content {
            display: block;
            .ul-wrapper {
              background: #fff;
              padding: 20px;
              width: 100%;
              .title {
                font-size: 24px;
              }
              ul {
                display: flex;
                flex-wrap: wrap;
                .item {
                  margin: 20px 10px 0 0;
                  width: 200px;
                  height: 60px;
                  border: 2px solid $color-border;
                  border-radius: 10px;
                  text-align: left;
                  font-size: 28px;
                  line-height: 60px;
                  .icon-name {
                    font-size: 16px;
                    padding: 5px;
                    border: 2px solid #56d176;
                    color: #56d176;
                    margin-right: 10px;
                    margin-left: 10px;
                    border-radius: 5px;
                  }
                  &.check {
                    color: $color-main;
                    .el-icon-check {
                      display: inline-block;
                      width: 35px;
                      margin-right: 10px;
                      margin-left: 10px;
                      text-align: center;
                      color: $color-main;
                    }
                  }
                }
              }

            }
            .btn-wrapper {
              padding: 15px;
              background: $color-background;
              display: flex;
              .btn {
                flex: 1;
                border-radius: 10px;
                height: 80px;
                line-height: 80px;
                font-size: 32px;
                color: $color-text;
                background: #fff;
                text-align: center;
                &.confirm {
                  margin-left: 15px;
                  color: #fff;
                  background: #56d176;
                }
              }
            }
          }
        }
      }
      .back-cover {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .3);
        z-index: 10;
        opacity: 1;
        &.fade-leave-active, &.fade-enter-active {
          transition: all .3s;
        }
        &.fade-leave-to, &.fade-enter {
          opacity: 0;
        }
      }
    }
    .food-content {
      position: absolute;
      left: 0;
      top: 165px;
      right: 0;
      bottom: 0;
      overflow: hidden;
      .item {
        padding: 40px 20px;
        display: flex;
        border-bottom: 1px solid #ccc;
        background: #fff;
        .icon {
          flex: 0 0 128px;
          width: 128px;
          img {
            width: 128px;
            height: 128px;
          }
        }
        .content {
          flex: 1;
          margin-left: 20px;
          .item-header {
            position: relative;
          }
          .title {
            height: 32px;
            line-height: 32px;
            padding-left: 0;
            .brand {
              display: inline-block;
              width: 60px;
              height: 32px;
              background-size: 60px 32px;
              @include bg-image('./brand')
            }
            .name {
              font-weight: 700;
              color: #333;
            }
          }
          .shop-supports {
            position: absolute;
            right: 10px;
            top: 5px;
            .support {
              display: inline-block;
              width: 24px;
              height: 24px;
              border: 2px solid #ccc;
              border-radius: 5px;
              text-align: center;
              margin-left: 4px;
              color: #999;
              font-size: 22px;
            }
          }
          .sell-info {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            .star-wrapper {
              display: inline-block;
              vertical-align: top;
            }
            .score {
              font-size: 20px;
              color: $color-score;
              margin: 0 10px;
            }
            .sell {
              font-size: 20px;
              color: #999;
            }
            .delivery-mode {
              span {
                display: inline-block;
                margin-left: 5px;
                font-size: 20px;
                font-weight: 700;
                padding: 4px 4px;
                color: #fff;
                background: $color-main;
                &.zsd {
                  color: $color-main;
                  background: #fff;
                  border: 1px solid $color-main;
                  box-sizing: border-box;
                }
              }
            }
          }
          .delivery-info {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            padding: 0 5px;
            span {
              font-size: 20px;
              color: #999;
              &.time {
                color: $color-main;
              }
            }
          }
        }
      }
    }
  }
</style>

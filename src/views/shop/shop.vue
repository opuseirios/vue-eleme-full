<template>
  <slide>
    <div class="shop">
      <div v-if="shopDetail">
        <div class="shop-header" ref="shopHeader">
          <div class="back" @click="back">
            <i class="icon-arrow-left"></i>
          </div>
          <div class="filter">
            <img :src="'http://elm.cangdu.org/img/'+shopDetail.image_path" alt="">
          </div>
          <div class="header-part">
            <div class="icon">
              <img :src="'http://elm.cangdu.org/img/'+shopDetail.image_path" alt="">
            </div>
            <div class="content">
              <h4 class="name">{{shopDetail.name}}</h4>
              <p class="desc">{{deliveryMode}}/配送费¥{{shopDetail.float_delivery_fee}}</p>
              <p class="bulletin">公告：{{shopDetail.promotion_info}}</p>
            </div>

            <div class="detail-icon" @click='checkShopDetail'>
              <i class="icon-arrow-right"></i>
            </div>
          </div>
          <div class="activity-content" v-if="shopDetail.activities.length>0">
            <div class="activity">
              <i class="activity-icon" :class="_getIconCls(shopDetail.activities[0].icon_name)">{{shopDetail.activities[0].icon_name}}</i>
              <span class="text">{{shopDetail.activities[0].description}}</span>
            </div>
            <div class="num" @click="show">{{shopDetail.activities.length}}个活动 <i class="icon-arrow-right"></i></div>
          </div>
        </div>
        <div class="shop-container">
          <div class="switch-wrapper" ref="switch">
            <switches @change="changeSwitch"></switches>
          </div>
          <div class="shop-content" ref="shopContent">
            <div class="goods-wrapper" v-if="switchIndex===0">
              <goods :shop-detail="shopDetail" :shop-id="shopId"></goods>
            </div>
            <div class="ratings-wrapper" v-if="switchIndex===1">
              <ratings :shop-id="shopId" :shop-detail="shopDetail"></ratings>
            </div>
          </div>
        </div>
      </div>
      <loading v-show="!shopDetail"></loading>
      <!--活动-->
      <transition name="fade">
        <div class="detail" v-if="showFlag&&shopDetail">
          <h4 class="title">{{shopDetail.name}}</h4>
          <section class="section info">
            <h5 class="name">优惠信息</h5>
            <div class="content">
              <ul>
                <li class="item" v-for="item in shopDetail.supports">
                  <i class="icon" :class="_getIconCls(item.icon_name)">{{item.icon_name}}</i> <span class="text">{{item.description}}</span>
                </li>
              </ul>
            </div>
          </section>
          <section class="section bulletin">
            <h5 class="name">商家公告</h5>
            <div class="content">
              <p class="text">{{shopDetail.promotion_info}}</p>
            </div>
          </section>
          <div class="close" @click="hide">
            <i class="icon-error"></i>
          </div>
        </div>
      </transition>
      <router-view></router-view>
    </div>
  </slide>
</template>

<script>
  import Slide from "../../base/slide/slide";
  import Switches from "../../base/switches/switches";
  import Loading from "../../base/loading/loading";
  import Goods from "../../components/goods/goods";
  import Ratings from "../../components/ratings/ratings";
  import Shopcart from "../../components/shopcart/shopcart";
  import axios from 'axios'
  import {mapMutations} from 'vuex'
  import Star from "../../base/star/star";

  export default {
    name: 'shop',
    components: {Star, Slide, Switches, Goods, Shopcart, Ratings, Loading},
    data() {
      return {
        geohash: '',
        shopId: -1,
        shopDetail: null,
        switchIndex: 0,
        showFlag:false
      }
    },
    created() {
      this.geohash = this.$route.query.geohash;
      this.shopId = parseInt(this.$route.query.id);
    },
    mounted(){
      this._initData();
    },
    computed: {
      deliveryMode() {
        if (this.shopDetail.delivery_mode) {
          return this.shopDetail.delivery_mode.text
        } else {
          return '商家配送';
        }
      }
    },
    methods: {
      back() {
        this.$router.back();
      },
      changeSwitch(index) {
        this.switchIndex = index;
      },
      checkShopDetail() {
        this.setShopDetail(this.shopDetail);
        this.$router.push({
          path: '/shop/shopDetail'
        });
      },
      show(){
        this.showFlag = true;
      },
      hide(){
        this.showFlag = false;
      },
       _initData(){
        this._getShopDetail();
        setTimeout(()=>{
          this._initShopHeight()
        },40)

      },
      _initShopHeight(){
        const rect = this.$refs.switch.getBoundingClientRect();
        const top = rect.top+rect.height;
        this.$refs.shopContent.style.top = top+'px';
      },
      _getShopDetail() {
        axios.get(`https://elm.cangdu.org/shopping/restaurant/${this.shopId}`)
          .then((res) => {
            if (res.status === 200) {
              this.shopDetail = res.data;
            }
          })
      },
      _getIconCls(name) {
        switch (name) {
          case '保':
            return 'guarantee';
          case '票':
            return 'ticket';
          case '新':
            return 'new';
          case '减':
            return 'decrease';
          case '准':
            return 'time'
        }
      },
      ...mapMutations({
        setShopDetail: 'SET_SHOP_DETAIL'
      })
    }
  }
</script>

<style lang='scss' scoped>
  .shop {
    /*background: #fff;*/
    .shop-header {
      padding: 48px 24px 36px 48px;
      position: relative;
      overflow: hidden;
      background: rgba(7, 17, 27, .3);
      color: #fff;
      .back {
        position: absolute;
        left: 0;
        top: 0;
        padding: 15px;
        i {
          font-size: 36px;
          font-weight: 600;
          color: #fff;
        }
      }
      .header-part {
        display: flex;
      }
      .icon {
        flex: 0 0 128px;
        width: 128px;
        border-radius: 4px;
        overflow: hidden;
        img {
          width: 128px;
          height: 128px;
        }
      }
      .content {
        flex: 1;
        margin-left: 32px;
        .name {
          font-size: 32px;
          font-weight: 600;
          line-height: 48px;
        }
        .desc {
          font-size: 24px;
          font-weight: 200;
          line-height: 48px;
        }
        .bulletin {
          font-size: 22px;
          font-weight: 200;
          line-height: 48px;
        }
      }
      .filter {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        filter: blur(20px);
        img {
          width: 100%;
        }
      }
      .detail-icon {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        padding: 20px;
        i {
          font-size: 36px;
          font-weight: 600;
          color: #fff;
        }
      }
      .activity-content {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        .activity {
          display: flex;
          .activity-icon {
            display: inline-block;
            font-style: normal;
            color: #fff;
            font-size: 20px;
            padding: 2px;
            margin-top: -2px;
            &.guarantee {
              background: rgb(153, 153, 153);
            }
            &.ticket {
              background: rgb(153, 153, 153);
            }
            &.decrease {
              background: rgb(240, 115, 115);
            }
            &.time {
              background: rgb(87, 169, 255);
            }
            &.new {
              background: rgb(112, 188, 70);
            }
          }
          span {
            margin-left: 10px;
            line-height: 28px;
          }
        }
      }
    }
    .shop-container {
      .shop-content {
        position: fixed;
        left: 0;
        top: 328px;
        bottom: 0;
        width: 100%;
        .goods-wrapper, .ratings-wrapper {
          height: 100%;
          overflow: hidden;
        }
      }
    }
  }

  .detail{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 99;
    opacity: 1;
    backdrop-filter: blur(10px);
    background: rgba(7,17,27,.8);
    color: #fff;
    &.fade-enter-active,&.fade-leave-active{
      transition: all .3s;
    }
    &.fade-enter,&.fade-leave-to{
      opacity: 0;
    }
    .title{
      font-size: 40px;
      font-weight: 700;
      margin-top: 128px;
      color: #fff;
      line-height: 40px;
      text-align: center;
    }
    .section{
      margin: 56px 72px;
      .name{
        position: relative;
        font-size: 28px;
        font-weight: 700;
        color: #fff;
        text-align: center;
        &:before{
          content: '';
          position: absolute;
          display: block;
          width: 224px;
          height: 4px;
          background: rgba(255,255,255,.2);
          left: 0;
          top: 12px;
        }
        &:after{
          content: '';
          position: absolute;
          display: block;
          width: 224px;
          height: 4px;
          background: rgba(255,255,255,.2);
          right: 0;
          top: 12px;
        }
      }
      .content{
        padding-top: 50px;
        .item{
          padding: 12px 0;
          .icon{
            display: inline-block;
            font-style: normal;
            color: #fff;
            font-size: 20px;
            padding: 2px;
            &.guarantee {
              background: rgb(153, 153, 153);
            }
            &.ticket {
              background: rgb(153, 153, 153);
            }
            &.decrease {
              background: rgb(240, 115, 115);
            }
            &.time {
              background: rgb(87, 169, 255);
            }
            &.new {
              background: rgb(112, 188, 70);
            }
          }
        }
        .text{
          font-size: 24px;
          font-weight: 200;
          line-height: 48px;
        }
      }
    }
    .close{
      position: absolute;
      bottom: 64px;
      left: 50%;
      transform: translateX(-50%);
      .icon-error{
        font-size: 64px;
        font-weight: 700;
      }
    }
  }
</style>

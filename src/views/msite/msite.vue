<template>
  <div class='msite'>
    <header class="msite-header">
      <router-link tag="div" to="/search" class="search">
        <i class="icon-search"></i>
      </router-link>
      <div class="title">{{address.name}}</div>
      <router-link tag="div" to="/profile" class="me">
        <i class="icon-me"></i>
      </router-link>
    </header>
    <nav class="msite-nav">
      <swiper :options="swiperOption" v-if="entries.length">
        <swiper-slide v-for="(slide,index) in entries" :key="index">
          <ul class="clearfix">
            <li class="item" v-for="item in slide" :key="item.link" @click="goToFood(item)">
              <img :src="'https://fuss10.elemecdn.com'+item.image_url" alt="">
              <span class="text">{{item.title}}</span>
            </li>
          </ul>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </nav>
    <split></split>
    <section class="msite-restaurants">
      <h4 class="title"><i class="icon-gift"></i><span>附近商家</span></h4>
      <ul>
        <li class="item" v-for="item in restaurants" @click="goToShop(item)">
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
    </section>
    <tabs></tabs>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapGetters} from 'vuex'
  import Tabs from "../../components/tabs/tabs";

  import {swiper,swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  import Split from "../../base/split/split";
  import Star from "../../base/star/star";


  const SwiperNum = 8;

  export default {
    components: {
      Star,
      Split,
      Tabs,swiper,swiperSlide},
    name: 'msite',
    data() {
      return {
        geohash: '',
        address: {},
        entries: [],
        swiperOption: {
          loop: true,
          pagination: {
            el: '.swiper-pagination',
          },
        },
        restaurants:[],
      }
    },
    mounted() {
      this.geohash = localStorage.getItem('__geoHash__');
      this._getAddress();
      this._getIndexEntry();
      this._getRestaurants();
    },
    computed: {
      ...mapGetters([
        'currentLocation'
      ])
    },
    methods: {
      reload() {
        this.geohash =  localStorage.getItem('__geoHash__');
      },
      /*店铺详情*/
      goToShop(item){
        this.$router.push({
          path:'/shop',
          query:{
            geohash:this.geohash,
            id:item.id
          }
        })
      },
      /*食品分类*/
      goToFood(item){
        this.$router.push({
          path:'/food',
          query:{
            geohash:this.geohash,
            title:item.title,
            restaurant_category_id:this._getCategoryId(item.link)
          }
        })
      },
      /*获取当前地址*/
      _getAddress() {
        if (!this.geohash) {
          this.reload();
        }
        axios.get(`https://elm.cangdu.org/v2/pois/${this.geohash}`)
          .then((res) => {
            if (res.status === 200) {
              this.address = res.data;
            }
          })
      },
      /*获取首页信息*/
      _getIndexEntry() {
        axios.get('https://elm.cangdu.org/v2/index_entry')
          .then((res) => {
            if (res.status === 200) {
              this.entries = this._splitEntries(res.data);
            }
          })
      },
      _splitEntries(entries) {
        const index = entries.length / SwiperNum;
        let newEntries = [];
        for (let i = 0; i < index; i++) {
          let sliceEntries = entries.slice(i * SwiperNum, (i + 1) * SwiperNum)
          newEntries.push(sliceEntries)
        }
        return newEntries;
      },
      /*获取商铺列表*/
      _getRestaurants(){
        axios.get('https://elm.cangdu.org/shopping/restaurants',{
          params:{
            latitude:this.currentLocation.latitude||this.$route.query.geohash.split(',')[0],
            longitude:this.currentLocation.longitude||this.$route.query.geohash.split(',')[1]
          }
        }).then((res)=>{
          if(res.status === 200){
            this.restaurants = res.data;
          }
        })
      },
      _getCategoryId(url){
        let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
        console.log(urlData)
        if(/restaurant_category_id/gi.test(urlData)){
          return JSON.parse(urlData).restaurant_category_id.id
        }else {
          return ''
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";
  @import "./../../assets/scss/mixin";
  .msite{
    padding-bottom: 90px;
  }
  .msite-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 90px;
    background: $color-main;
    z-index: 99;
    .search {
      position: absolute;
      left: 20px;
      top: 0;
      i {
        font-size: 40px;
        color: #fff;
        line-height: 90px;
      }
    }
    .title {
      position: absolute;
      left: 25%;
      width: 50%;
      text-align: center;
      font-size: 32px;
      font-weight: 700;
      color: #fff;
      line-height: 90px;
      @include no-wrap();
    }
    .me {
      position: absolute;
      right: 20px;
      top: 0;
      i {
        font-size: 40px;
        color: #fff;
        line-height: 90px;
      }
    }
  }

  .msite-nav {
    margin-top: 90px;
    background: #fff;
    ul{
      padding-bottom: 20px;
    }
    .item {
      width: 187.5px;
      float: left;
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      img {
        width: 80px;
        height: 80px;
        margin-bottom: 20px;
      }
      .text {
        font-size: 22px;
        color: #666;
      }
    }
  }
  .msite-restaurants{
    background: #fff;
    .title{
      height: 80px;
      line-height: 80px;
      padding-left: 20px;
      i{
        font-size: 36px;
        color: #999;
        vertical-align: middle;
      }
      span{
        margin-left: 10px;
        font-size: 28px;
        color: #999;
        vertical-align: middle;
      }
    }
    .item{
      padding: 40px 20px;
      display: flex;
      border-bottom: 1px solid #ccc;
      .icon{
        flex: 0 0 128px;
        width: 128px;
        img{
          width: 128px;
          height: 128px;
        }
      }
      .content{
        flex: 1;
        margin-left: 20px;
        .item-header{
          position: relative;
        }
        .title{
          height: 32px;
          line-height: 32px;
          padding-left: 0;
          .brand{
            display: inline-block;
            width: 60px;
            height: 32px;
            background-size: 60px 32px;
            @include bg-image('./brand')
          }
          .name{
            font-weight: 700;
            color: #333;
          }
        }
        .shop-supports{
          position: absolute;
          right: 10px;
          top: 5px;
          .support{
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
        .sell-info{
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          .star-wrapper{
            display: inline-block;
            vertical-align: top;
          }
          .score{
            font-size: 20px;
            color: $color-score;
            margin: 0 10px;
          }
          .sell{
            font-size: 20px;
            color: #999;
          }
          .delivery-mode{
            span{
              display: inline-block;
              margin-left: 5px;
              font-size: 20px;
              font-weight: 700;
              padding: 4px 4px;
              color: #fff;
              background: $color-main;
              &.zsd{
                color: $color-main;
                background: #fff;
                border: 1px solid $color-main;
                box-sizing: border-box;
              }
            }
          }
        }
        .delivery-info{
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          padding: 0 5px;
          span{
            font-size: 20px;
            color: #999;
            &.time{
              color: $color-main;
            }
          }
        }
      }
    }
  }

</style>
<style>
  .swiper-pagination-bullet{
    width: 16px;
    height: 16px;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet{
    margin: 0 10px;
  }
</style>

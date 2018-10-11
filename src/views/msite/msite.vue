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
            <router-link tag="li" class="item" v-for="item in slide" :to="item.link" :key="item.link">
              <img :src="'https://fuss10.elemecdn.com'+item.image_url" alt="">
              <span class="text">{{item.title}}</span>
            </router-link>
          </ul>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </nav>
    <tabs></tabs>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapGetters} from 'vuex'
  import Tabs from "../../components/tabs/tabs";

  import {swiper,swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'


  const SwiperNum = 8;

  export default {
    components: {Tabs,swiper,swiperSlide},
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
        }
      }
    },
    mounted() {
      this.geohash = this.currentLocation.geohash;
      this._getAddress();
      this._getIndexEntry();
    },
    computed: {
      ...mapGetters([
        'currentLocation'
      ])
    },
    methods: {
      reload() {
        this.geohash = this.$route.query.geohash;
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
              console.log(this.entries);
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
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";
  @import "./../../assets/scss/mixin";

  .msite-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 90px;
    background: $color-main;
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

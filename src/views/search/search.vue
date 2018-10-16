<template>
  <div class='search'>
    <div class="header">
      <i class="icon-arrow-left" @click="back"></i>
      <h4 class="title">搜索</h4>
    </div>
    <div class="search-form">
      <div>
        <input type="search" name="city" placeholder="输入学校、商物楼、地址" class="city-input input-style" v-model="keyword"
               required>
        <i class="icon-error" v-show="keyword" @click="clearSearch"></i>
      </div>
      <button class="city-submit input-style" @click="searchKeyword">提交</button>
    </div>
    <section class="keyword-search" v-show="!searchFlag">
      <split :split-height="splitHeight">
        <h5 class="title" slot="message">搜索历史</h5>
      </split>
      <ul>
        <transition-group name="slide" >
          <li class="item" v-for="item in searchHistory" :key="item" @click="keyword=item">
            <p class="text">{{item}}</p>
            <i class="icon-error" @click="deleteSearchHistory(item)"></i>
          </li>
        </transition-group>
        <li class="item clearSearch" @click="clearSearchHistory" v-show="searchHistory.length">
          清空搜索历史
        </li>
      </ul>
    </section>
    <section class="search-result" v-show="keyword.length>0&&searchFlag">
      <div class="results" v-show="results.length>0">
        <split :split-height="splitHeight">
          <h4 class="title" slot="message">商家</h4>
        </split>
        <ul>
          <li class="item" v-for="item in results">
            <div class="icon">
              <img :src="'http://elm.cangdu.org/img/'+item.image_path" alt="">
            </div>
            <div class="content">
              <h3 class="name">{{item.name}}</h3>
              <p class="sell">月售{{item.recent_order_num}}单</p>
              <p class="desc">{{item.float_minimum_order_amount}}元起送/距离{{item.distance}}公里</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="no-result" v-show="results.length===0">很抱歉，无搜索结果</div>
    </section>
    <tabs></tabs>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import Tabs from "../../components/tabs/tabs";
  import Split from "../../base/split/split";
  import axios from 'axios'

  export default {
    components: {
      Split,
      Tabs
    },
    name: 'search',
    computed: {
      ...mapGetters([
        'currentLocation',
        'searchHistory'
      ])
    },
    data() {
      return {
        location: "",
        keyword: '',
        splitHeight: 29,
        results: [],
        searchFlag:false
      }
    },
    mounted() {

    },
    methods: {
      clearSearch() {
        this.keyword = '';
        this.searchFlag = false;
      },
      searchKeyword() {
        this.saveSearchHistory(this.keyword);
        axios.get('https://elm.cangdu.org/v4/restaurants', {
          params: {
            geohash: this.$route.params.location,
            keyword: this.keyword
          }
        }).then((res) => {
          if (res.status === 200) {
            this.searchFlag = true;
            this.results = res.data;
          }
        })
      },
      back() {
        this.$router.back();
      },
      ...mapActions([
        'saveSearchHistory',
        'deleteSearchHistory',
        'clearSearchHistory'
      ])
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";

  .header {
    width: 100%;
    height: 90px;
    position: relative;
    background: $color-main;
    .icon-arrow-left {
      position: absolute;
      padding: 20px;
      font-size: 44px;
      color: #fff;
      font-weight: 600;
    }
    .title {
      left: 10%;
      position: absolute;
      top: 0;
      width: 80%;
      line-height: 90px;
      text-align: center;
      font-size: 44px;
      font-weight: 600;
      color: #fff;
    }
  }

  .search-form {
    margin-top: 20px;
    background: #fff;
    display: flex;
    padding: 0 20px;
    div {
      text-align: center;
      position: relative;
      flex: 1;
      margin-right: 10px;
    }
    .input-style {
      height: 70px;
      margin-bottom: 20px;
      border: 1px solid #e4e4e4;
      padding: 0 10px;
      color: #333;
      font-size: 32px;
    }
    .city-input {
      width: 100%;
      padding-left: 20px;
      margin-top: 20px;
    }
    .city-submit {
      flex: 0 0 120px;
      width: 120px;
      color: #fff;
      background: $color-main;
      margin-top: 20px;
    }
    .icon-error {
      position: absolute;
      right: 15px;
      top: 42px;
      font-size: 20px;
      color: $color-main;
      font-weight: 700;
    }
  }

  .keyword-search {
    background: #fff;
    .split {
      .title {
        line-height: 60px;
        padding-left: 20px;
        font-size: 26px;
        font-weight: 500;
      }
    }
    .item {
      width: 100%;
      padding: 0 40px;
      box-sizing: border-box;
      display: flex;
      height: 90px;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #ddd;
      overflow: hidden;
      &.slide-enter-active,&.slide-leave-active{
        transition:all .1s;
      }
      &.slide-enter,&.slide-leave-to{
        height: 0;
      }
      &.clearSearch{
        font-size: 32px;
        color: $color-main;
        font-weight: 600;
      }
      .text {
        flex: 1;
        font-size: 32px;
        color: #333;
      }
      .icon-error {
        flex: 0 0 30px;
        width: 30px;
        font-size: 18px;
        color: #999;
      }
    }
  }
  .search-result{
    padding-bottom: 90px;
    .title{
      line-height: 60px;
      font-size: 28px;
      padding-left: 20px;
      color: $color-text;
    }
    .item{
      display: flex;
      background: #fff;
      padding: 20px 30px 40px 30px;
      border-bottom: 1px solid #ccc;
      .icon{
        flex: 0 0 80px;
        height: 80px;
        img{
          width: 80px;
          height: 80px;
        }
      }
      .content{
        flex: 1;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #ccc;
        padding-bottom: 20px;
        .name{
          font-size: 24px;
          color: $color-text;
        }
        .sell{
          font-size: 24px;
          margin: 20px 0;
        }
        .desc{
          font-size: 24px;
        }
      }
    }
    .no-result{
      line-height: 60px;
      font-size: 28px;
      text-align:center;
      background: #fff;
      color: $color-text;
    }
  }
</style>

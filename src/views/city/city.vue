<template>
  <div class='city' @click.stop.prevent>
    <header class="city-header">
      <div class="back">
        <i class="icon-arrow-left" @click="back"></i>
      </div>
      <div class="title">{{cityName}}</div>
      <router-link tag="div" class="changeCity" to="/home">切换城市</router-link>
    </header>
    <form class="city-form">
      <div>
        <input type="search" name="city" placeholder="输入学校、商物楼、地址" class="city-input input-style" v-model="keyword"
               required>
        <i class="icon-error" v-show="keyword" @click="clearSearch"></i>
      </div>
      <div>
        <input type="submit" name="submit" class="city-submit input-style" @click="searchLocation" value="提交">
      </div>
    </form>
    <section class="city-search" v-show="locationSearchResult.length===0">
      <split :split-height="splitHeight">
        <h5 class="title" slot="message">搜索历史</h5>
      </split>
      <ul>
        <li class="item" v-for="item in locationHistory">
          <h4 class="name">{{item.name}}</h4>
          <p class="text">{{item.address}}</p>
        </li>
        <li class="item clearLocation" @click="clearAllLocation" v-show="locationHistory.length">
          清空所有
        </li>
      </ul>
    </section>
    <section class="city-search-result" v-show="locationSearchResult.length>0">
      <ul>
        <li class="item" v-for="item in locationSearchResult" @click="addLocationHistory(item)">
          <h4 class="name">{{item.name}}</h4>
          <p class="text">{{item.address}}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'
  import Split from "../../base/split/split";
  import {mapGetters,mapActions} from 'vuex'

  export default {
    components: {Split},
    name: 'city',
    data() {
      return {
        cityId: '',
        cityName: '',
        keyword: '',
        splitHeight: 19,
        locationSearchResult: []
      }
    },
    mounted() {
      this.cityId = this.$route.params.id;
      this._getCityById(this.cityId);
    },
    computed:{
      ...mapGetters([
        'locationHistory'
      ])
    },
    methods: {
      back() {
        this.$router.back();
      },
      /*清除搜索*/
      clearSearch() {
        this.keyword = '';
      },
      /*搜索地址*/
      searchLocation() {
        axios.get('https://elm.cangdu.org/v1/pois', {
          params: {
            city_id: this.cityId,
            keyword: this.keyword,
            type: 'search'
          }
        }).then((response) => {
          if (response.status === 200) {
            this.locationSearchResult = response.data;
          }
        })
      },
      addLocationHistory(item){
        console.log(item);
        this.addLocation(item);
      },
      _getCityById(id) {
        axios.get(`https://elm.cangdu.org/v1/cities/${id}`).then(response => {
          let res = response.data;
          this.cityName = res.name;
        })
      },
      ...mapActions({
        addLocation:"saveLocationHistory",
        clearAllLocation:"clearLocationHistory"
      })
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";

  .city {
  }

  .city-header {
    width: 100%;
    height: 90px;
    background: $color-main;
    color: #fff;
    .back {
      position: absolute;
      left: 0;
      top: 0;
      .icon-arrow-left {
        font-size: 36px;
        font-weight: 600;
        padding: 20px;
        line-height: 90px;
      }
    }
    .title {
      position: absolute;
      left: 10%;
      top: 0;
      width: 80%;
      text-align: center;
      font-size: 42px;
      font-weight: 700;
      line-height: 90px;
    }
    .changeCity {
      position: absolute;
      right: 20px;
      top: 0;
      line-height: 90px;
      font-size: 28px;
      color: #fff;
      text-align: center;
    }
  }

  .city-form {
    width: 100%;
    margin-top: 30px;
    background: #fff;
    div {
      width: 90%;
      margin: 0 auto;
      text-align: center;
      position: relative;
    }
    .input-style {
      width: 100%;
      height: 70px;
      margin-bottom: 20px;
      border: 1px solid #e4e4e4;
      padding: 0 10px;
      color: #333;
      font-size: 32px;
    }
    .city-input {
      padding-left: 20px;
      margin-top: 20px;
    }
    .city-submit {
      color: #fff;
      background: $color-main;
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

  .city-search {
    background: #fff;
    .split {
      .title {
        line-height: 40px;
        padding-left: 20px;
      }
    }
    .item {
      width: 100%;
      padding: 0 40px;
      box-sizing: border-box;
      display: flex;
      height: 128px;
      border-bottom: 1px solid #ddd;
      flex-direction: column;
      justify-content: center;
      &.clearLocation{
        text-align: center;
        font-size: 36px;
        height: 100px;
        color: #333;
      }
      .name {
        font-size: 32px;
        margin-bottom: 20px;
        color: #333;
      }
      .text {
        font-size: 18px;
        color: #999;
      }
    }
  }

  .city-search-result {
    background: #fff;
    border-top: 3px solid #ccc;
    .item {
      width: 100%;
      padding: 0 40px;
      box-sizing: border-box;
      display: flex;
      height: 128px;
      border-bottom: 1px solid #ddd;
      flex-direction: column;
      justify-content: center;
      .name {
        font-size: 32px;
        margin-bottom: 20px;
        color: #333;
      }
      .text {
        font-size: 18px;
        color: #999;
      }
    }
  }
</style>

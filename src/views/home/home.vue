<template>
  <div class='home'>
    <main-header></main-header>
    <nav class="city-nav">
      <div class="city-tip">
        <span>当前定位城市：</span>
        <span>定位不准确，请在城市列表中选择</span>
      </div>
      <router-link class="currentCity" :to="'/city/'+currentCity.id">
        {{currentCity.name}}
        <i class="icon-arrow-right"></i>
      </router-link>
    </nav>
    <split class="no-top"></split>
    <section class="city-section hot-city">
      <h4 class="title">热门城市</h4>
      <ul class="clearfix">
        <li class="city" v-for="city in hotCities">
          <router-link :key="city.id" :to="'/city/'+city.id">
            {{city.name}}
          </router-link>
        </li>
      </ul>
    </section>
    <split></split>
    <div class="cities" v-for="(cityGroup,key,index) in allCities">
      <section class="city-section">
        <h4 class="title">{{key}} <span v-if="index===0">（按字母排序）</span></h4>
        <ul class="clearfix">
          <li class="city" v-for="city in cityGroup">
            <router-link :key="city.id" :to="'/city/'+city.id">
              {{city.name}}
            </router-link>
          </li>
        </ul>
      </section>
      <split></split>
    </div>
  </div>
</template>

<script>
  import MainHeader from "../../components/mainHeader/mainHeader";
  import Split from "../../base/split/split";
  import axios from 'axios'

  export default {
    components: {
      Split,
      MainHeader
    },
    name: 'home',
    data() {
      return {
        hotCities: [],
        currentCity: '',
        allCities: null
      }
    },
    created() {
      this._getCurrentCity();
      this._getHotCities();
      this._getAllCities();
    },
    methods: {
      _getHotCities() {
        axios.get('https://elm.cangdu.org/v1/cities?type=hot')
          .then((response) => {
            if (response.status === 200) {
              this.hotCities = response.data;
            }
          })
      },
      _getCurrentCity() {
        axios.get('https://elm.cangdu.org/v1/cities?type=guess')
          .then((response) => {
            if (response.status === 200) {
              this.currentCity = response.data;
            }
          })
      },
      _getAllCities() {
        axios.get('https://elm.cangdu.org/v1/cities?type=group')
          .then((response) => {
            if (response.status === 200) {
              this.allCities = this._sortGroupCity(response.data);
            }
          })
      },
      _sortGroupCity(data){
        let sortObj = {};
        for(let i=65;i<=90;i++){
          if (data[String.fromCharCode(i)]) {
            sortObj[String.fromCharCode(i)] = data[String.fromCharCode(i)];
          }
        }
        return sortObj;
      }
    },
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";
  @import "./../../assets/scss/mixin";

  .home {
    background: #fff;
    .city-nav {
      margin-top: 60px;
      padding: 40px 0 0 0;
      .city-tip {
        display: flex;
        justify-content: space-between;
        line-height: 80px;
        border-bottom: 1px solid #ddd;
        padding: 0 20px;
        span {
          font-size: 14px;
          color: #666;
          &:last-child {
            font-size: 12px;
            color: #9f9f9f;
            font-weight: 700;
          }
        }
      }
      .currentCity {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        height: 80px;
        line-height: 80px;
        font-size: 36px;
        color: $color-main;
        i {
          font-size: 36px;
          font-weight: 700;
          color: $color-text-bold;
        }
      }
    }
    .city-section {
      background: #fff;
      .title {
        font-weight: 400;
        color: $color-text;
        font-size: 26px;
        line-height: 60px;
        text-indent: 20px;
        border-bottom: 1px solid #ccc;
      }
      .city {
        float: left;
        width: 187.5px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;
        box-sizing: border-box;
        font-size: 26px;
        @include no-wrap();
        &:nth-child(4n) {
          border-right: none;
        }
      }
      &.hot-city {
        .city {
          a {
            color: $color-main;
          }
        }
      }
    }
  }

  .split {
    margin-top: -14px;
    &.no-top {
      margin-top: 0;
    }
  }
</style>

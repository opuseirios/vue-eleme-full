<template>
  <slide>
    <div class="shop">
      <div class="shop-header" v-if="shopDetail">
        <div class="back" @click="back">
          <i class="icon-arrow-left"></i>
        </div>
        <div class="icon">
          <img :src="'http://elm.cangdu.org/img/'+shopDetail.image_path" alt="">
        </div>
        <div class="content">
          <h4 class="name">{{shopDetail.name}}</h4>
          <p class="desc">{{shopDetail.delivery_mode.text}}/配送费¥{{shopDetail.float_delivery_fee}}</p>
          <p class="bulletin">公告：{{shopDetail.promotion_info}}</p>
        </div>
        <div class="filter">
          <img :src="'http://elm.cangdu.org/img/'+shopDetail.image_path" alt="">
        </div>
        <div class="detail-icon">
          <i class="icon-arrow-right"></i>
        </div>
      </div>
      <div class="shop-container">
        <div class="switch-wrapper">
          <switches></switches>
        </div>
        <div class="shop-content">
          <div class="goods-wrapper">
            <goods :shop-detail="shopDetail" :shop-id="shopId"></goods>
          </div>
        </div>
      </div>
    </div>
  </slide>
</template>

<script>
  import Slide from "../../base/slide/slide";
  import Switches from "../../base/switches/switches";
  import Goods from "../../components/goods/goods";
  import Shopcart from "../../components/shopcart/shopcart";
  import axios from 'axios'
  export default {
    name: 'shop',
    components: {Slide,Switches,Goods,Shopcart},
    data(){
      return{
        geohash:'',
        shopId:-1,
        shopDetail:null,
      }
    },
    created() {
      this.geohash = this.$route.query.geohash;
      this.shopId = parseInt(this.$route.query.id);
      this._getShopDetail();
    },
    methods:{
      back(){
        this.$router.back();
      },
      _getShopDetail(){
        axios.get(`https://elm.cangdu.org/shopping/restaurant/${this.shopId}`)
          .then((res)=>{
            if(res.status === 200){
              this.shopDetail = res.data;
            }
          })
      }
    }
  }
</script>

<style lang='scss' scoped>
.shop{
  /*background: #fff;*/
  .shop-header{
    padding: 48px 24px 36px 48px;
    position: relative;
    display: flex;
    overflow: hidden;
    background: rgba(7, 17, 27, .3);
    color: #fff;
    .back{
      position: absolute;
      left: 0;
      top: 0;
      padding: 15px;
      i{
        font-size: 36px;
        font-weight: 600;
        color: #fff;
      }
    }
    .icon{
      flex: 0 0 128px;
      width: 128px;
      border-radius: 4px;
      overflow: hidden;
      img{
        width: 128px;
        height: 128px;
      }
    }
    .content{
      flex: 1;
      margin-left: 32px;
      .name{
        font-size: 32px;
        font-weight: 600;
        line-height: 48px;
      }
      .desc{
        font-size: 24px;
        font-weight: 200;
        line-height: 48px;
      }
      .bulletin{
        font-size: 22px;
        font-weight: 200;
        line-height: 48px;
      }
    }
    .filter{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      filter: blur(20px);
      img{
        width: 100%;
      }
    }
    .detail-icon{
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      padding: 20px;
      i{
        font-size: 36px;
        font-weight: 600;
        color: #fff;
      }
    }
  }
  .shop-container{
    .shop-content{
       .goods-wrapper{
         position: fixed;
         left: 0;
         top: 328px;
         bottom: 0;
         overflow: hidden;
         width: 100%;
       }
    }
  }
}
</style>

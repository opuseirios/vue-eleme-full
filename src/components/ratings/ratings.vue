<template>
  <scroll class='ratings' :data="data">
    <div>
      <div class="rating-header" v-if="score">
        <div class="leftNav">
          <h2 class="score">{{score.overall_score.toFixed(2)}}</h2>
          <p class="title">综合评分</p>
          <div class="desc">高于周边商家{{(score.compare_rating*100).toFixed(1)}}%</div>
        </div>
        <div class="rightNav">
          <div class="right-item">
            <span class="text">服务态度</span>
            <div class="star-wrapper">
              <star :score="parseFloat(score.service_score.toFixed(1))" :size="'48'"></star>
            </div>
            <span class="score">{{score.service_score.toFixed(1)}}</span>
          </div>
          <div class="right-item">
            <span class="text">菜品评价</span>
            <div class="star-wrapper">
              <star :score="parseFloat(score.food_score.toFixed(1))" :size="'48'"></star>
            </div>
            <span class="score">{{score.food_score.toFixed(1)}}</span>
          </div>
          <div class="right-item">
            <span class="text">送达时间</span>
            <div class="content">{{score.deliver_time}}分钟</div>
          </div>
        </div>
      </div>
      <split></split>
      <div class="rating-content">
        <div class="tags">
          <ul class="clearfix">
            <li class="tag-item"
                :class="[tag.unsatisfied?'unsatisfied':'satisfied',{'active':currentIndex===index}]" v-for="(tag,index) in tags">{{tag.name}}({{tag.count}})
            </li>
          </ul>
        </div>
        <div class="comments">
          <ul>
            <li class="item" v-for="item in comments">
              <div class="icon">
                <img :src="avatarSrc(item)" alt="">
              </div>
              <div class="content">
                <div class="header">
                  <span class="name">{{item.username}}</span>
                  <span class="time">{{item.rated_at}}</span>
                </div>
                <div class="user-rating">
                  <div class="star-wrapper">
                    <star :score="item.rating_star" :size="'48'"></star>
                  </div>
                  <span class="time-desc">{{item.time_spent_desc}}</span>
                </div>
                <div class="img-wrapper clearfix">
                  <div class="img" v-for="rating in item.item_ratings" v-if="rating.image_hash">
                    <img :src="_getImg(rating.image_hash)" alt="">
                  </div>
                </div>
                <div class="food-wrapper clearfix" v-show="item.item_ratings">
                  <div class="name" v-for="rating in item.item_ratings">{{rating.food_name}}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
  import axios from 'axios'
  import Star from "../../base/star/star";
  import Split from "../../base/split/split";
  import Scroll from "../../base/scroll/scroll";

  export default {
    name: '',
    components: {Split, Star, Scroll},
    props: {
      shopId: {
        type: Number,
        default: -1
      }
    },
    computed:{
      offset(){
        return this.page*this.pageSize;
      },
      data(){
        return this.comments.concat(this.tags)
      }
    },
    data() {
      return {
        score: null,
        tags: [],
        currentIndex: 0,
        page:0,
        pageSize:10,
        comments:[],
      }
    },
    mounted() {
      this._getRatingScore();
      this._getRatingFlag();
      this._getComments();
    },
    methods: {
      avatarSrc(item){
        if(!item.avatar.length){
          return 'http://elm.cangdu.org/img/default.jpg'
        }
        return this._getImg(item.avatar);
      },
      _getRatingScore() {
        axios.get(`https://elm.cangdu.org/ugc/v2/restaurants/${this.shopId}/ratings/scores`)
          .then((response) => {
            if (response.status === 200) {
              this.score = response.data;
            }
          })
      },
      _getRatingFlag() {
        axios.get(`https://elm.cangdu.org/ugc/v2/restaurants/${this.shopId}/ratings/tags`)
          .then((response) => {
            if (response.status === 200) {
              this.tags = response.data;
            }
          })
      },
      _getComments(){
        axios.get(`https://elm.cangdu.org/ugc/v2/restaurants/${this.shopId}/ratings`,{
          params:{
            offset:this.offset,
            limit:this.pageSize
          }
        }).then((res)=>{
          if(res.status === 200){
             this.comments = res.data;
          }
        })
      },
      _getImg(src){
        return `https://fuss10.elemecdn.com/${src.slice(0,1)}/${src.slice(1,3)}/${src.slice(3)}.jpeg`
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";

  .ratings {
    background: #fff;
    height: 100%;
    overflow: hidden;
    .rating-header {
      display: flex;
      padding: 36px 0;
      .leftNav {
        flex: 0 0 275px;
        width: 275px;
        text-align: center;
        border-right: 1px solid $color-text-bold;
        .score {
          font-size: 48px;
          color: rgb(255, 153, 0);
          line-height: 56px;
          margin-bottom: 12px;
        }
        .title {
          font-size: 24px;
          color: $color-text;
          margin-bottom: 16px;
        }
        .desc {
          font-size: 20px;
          color: $color-text-bold;
          padding-bottom: 12px;
        }
      }
      .rightNav {
        padding: 0 48px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .right-item {
          display: flex;
          margin-bottom: 10px;
          .text {
            font-size: 24px;
            color: $color-text;
            line-height: 36px;
          }
          .star-wrapper {
            padding: 0 24px;
            margin-top: 4px;
          }
          .score {
            font-size: 24px;
            color: rgb(255, 153, 0);
            line-height: 36px;
            font-weight: 600;
          }
          .content {
            margin-left: 24px;
            font-size: 24px;
            color: $color-text-bold;
            line-height: 36px;
          }
        }
      }
    }
    .rating-content {
      padding: 20px;
      background: #fff;
      .tags {
        .tag-item {
          float: left;
          font-size: 26px;
          padding: 20px;
          border-right: 10px;
          border-radius: 10px;
          margin: 0 20px 10px 0;
          &.satisfied {
            background: $color-satisfied;
            color: $color-text;
          }
          &.unsatisfied {
            background: $color-unsatisfied;
            color: $color-text-bold;
          }
          &.active {
            background: $color-main;
            color: #fff;
          }
        }
      }
    }
    .comments{
      .item{
        border-top: 1px solid $color-border;
        display: flex;
        padding: 20px 0;
        .icon{
          flex: 0 0 70px;
          width: 70px;
          height: 70px;
          img{
            width: 70px;
            border-radius: 50%;
          }
        }
        .content{
          flex: 1;
          margin-left: 30px;
          .header{
            display: flex;
            justify-content: space-between;
            font-size: 24px;
            color: $color-text;
            .time{
              color: $color-text-bold;
            }
          }
          .user-rating{
            margin-top: 20px;
            display: flex;
            .time-desc{
              margin-left: 10px;
              font-size: 26px;
              color: $color-text;
            }
          }
          .img-wrapper{
            margin: 10px 0;
            .img{
              float: left;
              width: 140px;
              height: 140px;
              margin-right: 20px;
              img{
                width: 140px;
              }
            }
          }
          .food-wrapper{
            width: 100%;
            .name{
              float: left;
              margin-right: 20px;
              width: 80px;
              padding: 10px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              border: 1px solid $color-border;
              color: $color-text-bold;
            }
          }
        }
      }
    }
  }
</style>

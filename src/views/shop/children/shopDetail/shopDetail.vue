<template>
  <slide>
    <div class='shopDetail'>
      <div class="header">
        <div class="icon" @click="back">
          <i class="icon-arrow-left"></i>
        </div>
        <h2 class="title">商家详情</h2>
      </div>
      <div class="shopDetail-content">
        <section class="section activity">
          <h3 class="title">活动与属性</h3>
          <div class="section-content">
            <ul>
              <li class="activity-item" v-for="item in shopDetail.supports">
                <i class="icon" :class="_getIconCls(item.icon_name)">{{item.icon_name}}</i>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
          </div>
        </section>
        <section class="section safe">
          <h3 class="title"><span>视频监督安全公示</span><span class="identify">企业认证详情<i class="icon-arrow-right"></i></span>
          </h3>
          <div class="section-content">
            <div class="icon">
              <img src="./good.png" alt="">
            </div>
            <div class="content">
              <div class="result">监督检查结果： <span>良好</span></div>
              <div class="date">检查日期：</div>
            </div>
          </div>
        </section>
        <section class="section info">
          <h3 class="title">商家信息</h3>
          <div class="section-content">
            <p class="name"><span>店名：</span>{{shopDetail.name}}</p>
            <p class="address"><span>地址：</span>{{shopDetail.address}}</p>
            <p class="time"><span>营业时间：</span>{{shopDetail.opening_hours[0]}}</p>
            <p class="license"><span>营业执照</span> <i class="icon-arrow-right"></i></p>
            <p class="permission"><span>餐饮服务许可证</span> <i class="icon-arrow-right"></i></p>
          </div>
        </section>
      </div>

    </div>
  </slide>

</template>

<script>
  import Slide from '../../../../base/slide/slide'
  import {mapGetters} from 'vuex'


  export default {
    name: '',
    components: {Slide},
    computed: {
      ...mapGetters([
        'shopDetail'
      ])
    },
    methods: {
      back() {
        this.$router.back();
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
            return 'decease';
          case '准':
            return 'time'
        }
      },
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../../../assets/scss/variables";

  .shopDetail {
    width: 100%;
    min-height: 100%;
    background: $color-background;
    .header {
      position: fixed;
      height: 90px;
      display: flex;
      left: 0;
      right: 0;
      top: 0;
      background: $color-main;
      .icon {
        position: absolute;
        left: 0;
        top: 0;
        padding: 20px;
        i {
          font-size: 32px;
          color: #fff;
          font-weight: 700;
          line-height: 50px;
        }
      }
      .title {
        width: 80%;
        margin: 0 auto;
        line-height: 90px;
        font-size: 32px;
        font-weight: 700;
        color: #fff;
        text-align: center;
      }
    }
    .shopDetail-content {
      padding-top: 90px;
      background: $color-background;
      .section {
        background: #fff;
        margin-top: 20px;
        .title {
          display: flex;
          justify-content: space-between;
          padding: 0 20px;
          font-size: 36px;
          color: $color-text;
          height: 80px;
          line-height: 80px;
          border-bottom: 1px solid $color-border;
          .identify {
            font-size: 26px;
            line-height: 80px;
            color: $color-text-bold;
            i {
              margin-left: 5px;
            }
          }
        }
        .section-content {
          background: #fff;
          padding: 40px 20px;
        }
        &.activity {
          .activity-item {
            padding: 15px 0;
            font-size: 0;
            .icon {
              display: inline-block;
              font-style: normal;
              color: #fff;
              font-size: 20px;
              padding: 10px 8px;
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
            .text {
              margin-left: 30px;
              font-size: 28px;
              line-height: 45px;
              color: $color-text-bold;
            }
          }
        }
        &.safe {
          .section-content {
            display: flex;
            .icon {
              flex: 0 0 90px;
              width: 100px;
              height: 100px;
              img {
                width: 100px;
                height: 100px;
              }
            }
            .content {
              flex: 1;
              display: flex;
              margin-left: 30px;
              flex-direction: column;
              justify-content: center;
              .result {
                margin-bottom: 20px;
                span {
                  color: rgb(112, 188, 70);
                }
              }
            }
          }
        }
        &.info{
          .section-content{
            padding: 20px;
            p{
              height: 90px;
              line-height: 90px;
              border-bottom: 1px solid $color-border;
              color: $color-text;
              span{
                margin-right: 10px;
              }
              &.license,&.permission{
                display: flex;
                justify-content: space-between;
                i{
                  font-size: 36px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

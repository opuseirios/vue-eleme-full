<template>
  <slide>
    <div class='addDetail'>
      <pageHeader title="搜索地址"></pageHeader>
      <section>
        <div class="add-detail">
          <input type="text" placeholder="请输入小区/写字楼/学校等" v-model="inputAddress">
          <button @click="inputThing">确认</button>
        </div>
        <div class="warnpart">为了满足商家的送餐要求，建议您从列表中选择地址</div>
        <div class="point" v-show="warning">
          <p>找不到地址</p>
          <p>请尝试输入小区、写字楼或学校名</p>
          <p>详细地址（如门牌号）可稍后输入哦</p>
        </div>
      </section>
      <scroll class="poisearch-container" v-show="addressList" :data="addressList">
         <ul>
           <li v-for="(item,index) in addressList" @click="selectItem(item)">
             <p>{{item.name}}</p>
             <p>{{item.address}}</p>
           </li>
         </ul>
      </scroll>
    </div>
  </slide>

</template>

<script>
  import PageHeader from './../../../../../../base/pageHeader/pageHeader'
  import Slide from './../../../../../../base/slide/slide'
  import Scroll from './../../../../../../base/scroll/scroll'
  import axios from 'axios'
  import {mapMutations} from 'vuex'
  import {setStore} from "../../../../../../assets/js/util";

  export default {
    name: '',
    components: {PageHeader, Slide, Scroll},
    data(){
      return{
        inputAddress:'',
        warning:true,
        addressList:[]
      }
    },
    methods:{
      inputThing(){
        axios.get('https://elm.cangdu.org/v1/pois',{
          params:{
            city_id:1,
            keyword:this.inputAddress,
            type:'nearby'
          }
        }).then((res)=>{
          if(res.status === 200){
            if(res.data.message){
              this.warning = true;
              this.addressList = [];
            }else {
              this.warning = false;
              this.addressList = res.data;
            }
          }
        })
      },
      selectItem(item){
        setStore('addressDetail',item.name);
        this.setAddAddress(item.name);
        this.$router.back();
      },
      ...mapMutations({
        setAddAddress:'SET_ADD_ADDRESS'
      })
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../../../../../assets/scss/variables";
.addDetail{
  width: 100%;
  height: 100%;
  background: $color-background;
  .add-detail{
    padding: 20px;
    background: #fff;
    display: flex;
    input{
      flex: 1;
      margin-right: 10px;
      background: $color-background;
      font-size: 32px;
      color: $color-text;
      padding: 25px 20px;
      border-radius: 10px;
    }
    button{
      flex: 0 0 150px;
      width: 150px;
      border-radius: 10px;
      font-size: 32px;
      border: none;
      color: #fff;
      background: $color-main;
    }
  }
  .warnpart{
    text-align: center;
    padding: 15px 0;
    font-size: 28px;
    background: #FFF6E4;
    color: #FF883F;
  }
  .point{
    position: absolute;
    left: 50%;
    width: 100%;
    top: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    z-index: 10;
    p{
      line-height: 60px;
      font-size: 32px;
      color: $color-text;
    }
  }
  .poisearch-container{
    position: fixed;
    top: 275px;
    bottom: 0;
    overflow: hidden;
    width: 100%;
    background: $color-background;
    li{
      border-bottom: 1px solid #ccc;
      display: flex;
      flex-direction: column;
      padding: 0 20px;
      justify-content: center;
      height: 120px;
      p{
        font-size: 28px;
        color: $color-text;
        &:first-child{
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>

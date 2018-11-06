<template>
  <slide>
    <div class='address'>
       <header class="header">
         <div class="icon" @click="back">
           <i class="icon-arrow-left"></i>
         </div>
         <h2 class="title">编辑地址</h2>
         <span class="edit" @click="editStatus=!editStatus">{{edit}}</span>
       </header>
      <scroll class="addressList" :data="addressList" ref="scroll">
        <transition-group name="remove">
        <li class="item" v-for="item in addressList" :key="item.name">
            <p>{{item.address}}</p>
            <p><span>{{item.phone}}</span><span v-if="item.phone_bk">、{{item.phone_bk}}</span></p>
            <i v-show="editStatus" class="el-icon-close" @click="deleteItem(item)"></i>
        </li>
        </transition-group>
      </scroll>
      <div class="addNew" @click="addNewAddress">
        <span>新增地址</span> <i class="icon-arrow-right"></i>
      </div>
    </div>
    <router-view></router-view>
  </slide>
</template>

<script>
  import PageHeader from './../../../../base/pageHeader/pageHeader'
  import Slide from './../../../../base/slide/slide'
  import Scroll from './../../../../base/scroll/scroll'
  import {mapGetters,mapActions} from 'vuex';

  export default {
    name: '',
    components: {PageHeader, Slide, Scroll},
    data(){
      return{
        editStatus:false
      }
    },
    computed:{
      edit(){
        return this.editStatus?'完成':'编辑'
      },
      ...mapGetters([
        'addressList'
      ])
    },
    methods:{
      back(){
        this.$router.back();
      },
      addNewAddress(){
        this.$router.push({
          path:"/profile/info/address/add"
        })
      },
      deleteItem(item){
        this.deleteAddressList(item);
        this.$refs.scroll.refresh();
      },
      ...mapActions([
        'deleteAddressList'
      ])
    },
    watch:{
      addressList(newVal){
        console.log(newVal);
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "../../../../assets/scss/variables";
  .address{
    width: 100%;
    height: 100%;
    background: $color-background;
    .header{
      width: 100%;
      height: 90px;
      background: $color-main;
      position: relative;
      .icon{
        position: absolute;
        padding: 20px;
        left: 0;
        top: 0;
        i{
          font-size: 36px;
          color: #fff;
          font-weight: 600;
        }
      }
      .title{
        line-height: 90px;
        width: 80%;
        text-align: center;
        margin: 0 auto;
        font-size: 36px;
        color: #fff;
        font-weight: 600;
      }
      .edit{
        position: absolute;
        right: 20px;
        top: 30px;
        font-size: 36px;
        color: #fff;
      }
    }
  }
  .addressList{
    margin-top: 30px;
    background: #fff;
    li{
      border-bottom: 1px solid #d9d9d9;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 120px;
      font-size: 26px;
      color: $color-text;
      position: relative;
      &.remove-enter-active,&.remove-leave-active{
        transition: all .1s;
      }
      &.remove-enter,&.remove-leave-to{
        height: 0;
      }
      p{
        &:first-child{
          margin-bottom: 20px;
        }
      }
      i{
        position: absolute;
        right: 20px;
        top: 50%;
        margin-top: -20px;
        font-size: 40px;
      }
    }
  }
  .addNew{
    margin-top: 30px;
    background: #fff;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    justify-content:space-between;
    align-items: center;
    padding: 20px;
    span{
      font-size: 36px;
      color: $color-text;
    }
  }
</style>

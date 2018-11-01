<template>
  <slide>
    <div class='setUserName' @click.stop>
      <page-header title="修改用户名"></page-header>
      <div class="content" :class="{'alert':!flag}">
        <input type="text" placeholder="输入用户名" v-model="newName">
        <p class="notice">用户名只能修改一次(5到24字符之间)</p>
      </div>
      <div class="confirm" :class="{'pass':flag&&newName.length>0}" @click="confirm">确认修改</div>
    </div>
  </slide>

</template>

<script>
  import Slide from './../../../../base/slide/slide'
  import PageHeader from './../../../../base/pageHeader/pageHeader'
  import {mapMutations,mapGetters} from 'vuex';

  export default {
    name: '',
    components: {Slide, PageHeader},
    computed:{
      ...mapGetters([
        'userInfo'
      ])
    },
    data(){
      return{
        newName:'',
        flag:true
      }
    },
    methods:{
      confirm(){
        if(!(this.flag&&this.newName.length>0)){
          return;
        }
        this.setUserName(this.newName);
        this.$router.go(-1);
      },
      ...mapMutations({
        setUserName:'SET_USER_NAME'
      })
    },
    watch:{
      newName(newVal){
        this.flag = /[\s\S]{5,}/.test(newVal);
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../../../assets/scss/variables";

  .setUserName {
    width: 100%;
    height: 100%;
    background: $color-background;
    .content{
      padding: 20px;
      input{
        width: 100%;
        height: 80px;
        color: $color-text;
        font-size: 32px;
        padding-left: 5px;
        background: $color-background;
        border: 1px solid $color-text-bold;
      }
      .notice{
        font-size: 24px;
        line-height: 80px;
        color: $color-text;
      }
      &.alert{
        input{
          border-color: red;
        }
        .notice{
          color: red;
        }
      }
    }
    .confirm{
      margin: 10px 20px;
      background: $color-main;
      height: 80px;
      text-align: center;
      line-height: 80px;
      color: rgba(255,255,255,.6);
      &.pass{
        color: #fff;
      }
    }
  }
</style>

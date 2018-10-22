<template>
  <ul class='switches'>
    <li class="switch-item" :class="{'current':index===currentIndex}" v-for="(item,index) in data" @click="changeIndex(index)">
      <span class="text">{{item.text}}</span>
    </li>
  </ul>
</template>

<script>
  export default {
    name: '',
    props: {
      data: {
        type: Array,
        default(){
          return [
            {
              text: '商品'
            },
            {
              text: '评价'
            }
          ]
        }
      },
      index:{
        type: Number,
        default: 0
      }
    },
    data(){
      return{
        currentIndex:0
      }
    },
    mounted(){
      this.currentIndex = this.index;
    },
    methods:{
      changeIndex(index){
        this.currentIndex = index;
        this.$emit('change',index);
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";
.switches{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background: #fff;
  border-bottom: 1px solid $color-border;
  .switch-item{
    flex: 1;
    text-align: center;
    color: $color-text;
    .text{
      padding-bottom: 10px;
      font-size: 32px;
    }
    &.current{
      color: $color-main;
      .text{
        border-bottom: 4px solid $color-main;
      }
    }
  }
}
</style>

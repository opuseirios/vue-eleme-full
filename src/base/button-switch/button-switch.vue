<template>
  <div class='button-switch' :class="{'active':switchOn}">
    <div class="circle-button" @click="changeSwitch"></div>
    <span>abc</span>
    <span>...</span>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        switchOn: false
      }
    },
    methods:{
      changeSwitch(){
        this.switchOn = !this.switchOn;
        this.switchOn ? this.$emit('on'):this.$emit('off');
      }
    },
    watch:{
      switchOn(value){
        if(value){

        }else {

        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  .button-switch {
    background-color: #ccc;
    display: flex;
    width: 75px;
    height: 30px;
    padding: 0 10px;
    border-radius: 20px;
    position: relative;
    &.active {
      background: #4cd964;
      .circle-button {
        left: 50px;
      }
    }
    .circle-button {
      position: absolute;
      transition: all .3s;
      top: -15px;
      left: -10px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #f1f1f1;
    }
  }
</style>

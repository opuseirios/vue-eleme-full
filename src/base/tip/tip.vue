<template>
  <div class='tip' v-show="showFlag">
    <p class="text">{{text}}</p>
  </div>
</template>

<script>
  export default {
    name: '',
    props:{
      text:{
        type:String,
        default:''
      }
    },
    data(){
      return{
        showFlag:false
      }
    },
    methods:{
      show(){
        this.showFlag = true;
        setTimeout(()=>{
          this.showFlag = false;
        },2000)
      }
    }
  }
</script>

<style lang='scss' scoped>
.text{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 70%;
  padding: 30px;
  border-radius: 20px;
  background: rgba(0,0,0,0.7);
  color: #fff;
  font-size: 32px;
  text-align: center;
}
</style>

<template>
  <div class='star' :class="starType">
    <span v-for="star in stars" class="item" :class="star"></span>
  </div>
</template>

<script>
  const HALF = 'half';
  const ON = 'on';
  const OFF = 'off';
  export default {
    name: 'star',
    props: {
      score: {
        type: Number,
        default: 0
      },
      size:{
        type:String,
        default:'24'
      }
    },
    computed: {
      starType(){
        return 'star-'+this.size
      },
      stars() {
        let count = parseInt(this.score);
        let decimal = this.score-count;
        let newStar = [];
        for(let i=0;i<count;i++){
          newStar.push(ON);
        }
        if(decimal*2>1){
          newStar.push(HALF);
        }
        while(newStar.length<5){
          newStar.push(OFF)
        }
        return newStar;
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../assets/scss/variables";
  @import "./../../assets/scss/mixin";
  .star{
    font-size: 0;
    .item{
      display: inline-block;
    }
    &.star-48{
      .item{
        width: 20px;
        height: 20px;
        background-size: 20px 20px;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          @include bg-image('star48_on')
        }
        &.half{
          @include bg-image('star48_half')
        }
        &.off{
          @include bg-image('star48_off')
        }
      }
    }
    &.star-36{
      .item{
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          @include bg-image('star36_on')
        }
        &.half{
          @include bg-image('star36_half')
        }
        &.off{
          @include bg-image('star36_off')
        }
      }
    }
    &.star-24{
      .item{
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          @include bg-image('star24_on')
        }
        &.half{
          @include bg-image('star24_half')
        }
        &.off{
          @include bg-image('star24_off')
        }
      }
    }
  }

</style>

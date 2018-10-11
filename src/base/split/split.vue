<template>
  <div class='split'>
    <slot name="message"></slot>
  </div>
</template>

<script>
  export default {
    name: 'split',
    props: {
      splitHeight: {
        type: Number,
        default: 13
      }
    },
    mounted() {
      let split = document.querySelectorAll('.split');
      for(let i=0;i<split.length;i++){
        split[i].style.height = `${this.splitHeight}px`
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "../../assets/scss/variables";

  .split {
    width: 100%;
    border-bottom: 2px solid #ccc;
    border-top: 2px solid #ccc;
    background: $color-background;
  }
</style>

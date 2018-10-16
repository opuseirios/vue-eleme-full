<template>
  <transition name="slide">
    <div class='slide'>
        <slot></slot>
    </div>
  </transition>
</template>

<script>
    export default {
        name: ''
    }
</script>

<style lang='scss' scoped>
.slide{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  &.slide-enter-active,&.slide-leave-active{
    transition: all .2s;
  }
  &.slide-enter,&.slide-leave-to{
    transform: translate3d(100%,0,0);
  }
}
</style>

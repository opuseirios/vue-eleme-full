<template>
  <div class='scroll' ref="scroll">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: '',
    props: {
      data: {
        type: Array,
        default: null
      },
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      }
    },
    created() {
      setTimeout(()=>{
        this._initScroll();
      },20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.scroll) {
          return;
        }
        this.scroll = new BScroll(this.$refs.scroll, {
          click: this.click,
          probeType: this.probeType
        })
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh();
        }, 20)
      }
    }
  }
</script>

<style lang='scss' scoped>

</style>

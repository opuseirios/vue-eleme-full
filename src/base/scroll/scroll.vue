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
      },
      listenScroll: {
        type: Boolean,
        default: true
      },
      pullUp:{
        type:Boolean,
        default:Boolean
      }
    },
    created() {
      setTimeout(() => {
        this._initScroll();
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.scroll) {
          return;
        }
        this.scroll = new BScroll(this.$refs.scroll, {
          click: this.click,
          probeType: this.probeType
        });
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos);
          })
        }
        if(this.pullUp){
          this.scroll.on('scrollEnd',()=>{
            if(this.scroll.y<=(this.scroll.maxScrollY+50)){
              this.$emit('scrollToEnd');
            }
          })
        }
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
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

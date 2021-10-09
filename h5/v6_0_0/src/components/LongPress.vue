<template>
  <div
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
    @touchcancel="touchCancel"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "LongPress",
  props: {
    msg: String,
    time: {
      type: Number,
      default: 500
    }
  },
  methods: {
    touchStart() {
      this.timer = window.setTimeout(() => {
        this.$emit("longPressCallback");
      }, this.time);
    },
    touchMove() {
      window.clearTimeout(this.timer);
    },
    touchEnd() {
      window.clearTimeout(this.timer);
    },
    touchCancel() {
      window.clearTimeout(this.timer);
    }
  }
};
</script>
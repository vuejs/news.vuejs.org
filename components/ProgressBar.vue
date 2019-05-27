<template lang="pug">
.podcast-progress-bar(@click="updateProgress")
  .podcast-progress(:style="progressStyle")
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      required: true,
      default: 0
    }
  },
  computed: {
    progressStyle () {
      return {
        width: `${this.progress}%`
      }
    }
  },
  methods: {
    updateProgress (e) {
      let tag = e.target
      const pos = tag.getBoundingClientRect()
      const seekPos = (e.clientX - pos.left) / pos.width
      this.$emit('update', seekPos)
    }
  }
}
</script>

<style lang="sass" scoped>
@import 'assets/branding'

.podcast-progress-bar
  position: absolute
  top: -5px
  left: 0
  right: 0
  width: 100%
  height: 5px
  background: darken($color-dark-blue, 15%)
  cursor: pointer
  overflow: hidden
  transition: transform 0.2s ease
  transform-origin: bottom

.podcast-progress
  height: 10px
  background: linear-gradient(to left, lighten($color-green, 5%), darken($color-green, 5%))
  pointer-events: none
  position: relative
</style>

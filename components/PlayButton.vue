<template lang="html">
<button class="play-button" type="button" @click="toggle">
  <svg width="35px" height="35px" viewBox="0 0 100 100">
    <polygon points="0,0 0,100 87,50 87,50" fill="#42b983">
      <animate ref="largeTrianglePause" fill="freeze" attributeName="points" dur="150ms" to="0,10 0,90 30,90 30,10" keyTimes="0.82; 0.1; 0.15; 1" />
      <animate ref="largeTrianglePlay" fill="freeze" attributeName="points" dur="150ms" to="0,0 0,100 87,50 87,50" keyTimes="0.82; 0.1; 0.15; 1" />
    </polygon>
    <polygon points="0,20 0,80 55,50 55,50" fill="#42b983">
      <animate ref="smallTrianglePause" fill="freeze" attributeName="points" dur="150ms" to="40,10 40,90 70,90 70,10" keyTimes="0.82; 0.1; 0.15; 1" />
      <animate ref="smallTrianglePlay" fill="freeze" attributeName="points" dur="150ms" to="0,20 0,80 55,50 55,50" keyTimes="0.82; 0.1; 0.15; 1" />
    </polygon>
  </svg>
</button>
</template>

<script>
export default {
  props: {
    paused: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toggle () {
      this.$emit('toggle')
    }
  },
  watch: {
    paused (isPaused) {
      if (!isPaused) {
        this.$refs.largeTrianglePause.beginElement()
        this.$refs.smallTrianglePause.beginElement()
      } else {
        this.$refs.largeTrianglePlay.beginElement()
        this.$refs.smallTrianglePlay.beginElement()
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.play-button
  border: none
  border-radius: 100%
  background: none
  height: 50px
  width: 50px
  cursor: pointer

  svg
    display: block
    margin: 0 2px 0 auto

  &:focus
    outline: none
</style>

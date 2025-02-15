<template lang="pug">
.podcast-progress-bar(@click="updateProgress")
  .podcast-progress(:style="progressStyle")
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  progress: number
}>()

const emit = defineEmits<{
  (e: 'update', seekPos: number): void
}>()

const progressStyle = computed(() => ({
  width: `${props.progress}%`
}))

const updateProgress = (e: MouseEvent) => {
  const tag = e.target as HTMLElement
  const pos = tag.getBoundingClientRect()
  const seekPos = (e.clientX - pos.left) / pos.width
  emit('update', seekPos)
}
</script>

<style lang="sass" scoped>
@use '~/assets/branding'

.podcast-progress-bar
  position: absolute
  top: -5px
  left: 0
  right: 0
  width: 100%
  height: 5px
  // background: darken($color-dark-blue, 15%)
  cursor: pointer
  overflow: hidden
  transition: transform 0.2s ease
  transform-origin: bottom

.podcast-progress
  height: 10px
  // background: linear-gradient(to left, lighten($color-green, 5%), darken($color-green, 5%))
  pointer-events: none
  position: relative
</style>

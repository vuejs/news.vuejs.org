<template lang="pug">
  .markdown(v-html="html")
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

const props = defineProps<{
  content: string
}>()

const html = computed(() => {
  return marked.parse(props.content)
})
</script>

<style lang="sass">
@use '~/assets/branding'

mark
  background: branding.$color-blue
  background: branding.$color-blue
  color: #fff
  padding: 0 6px
  font-weight: 700
  border-radius: 5px

.markdown
  font-size: 15px
  line-height: 1.4
  white-space: pre-line

  ul
    line-height: 0.4

  li
    line-height: 1.2

  @media #{branding.$small-up}
    font-size: 16px

  @media #{branding.$medium-up}
    font-size: 18px

  a
    font-weight: 600
    color: branding.$color-green

    &:hover
      text-decoration: underline

  blockquote
    padding-left: 20px
    border-left: 3px solid #ddd

  img
    max-width: 100%

    &+em
      display: block
      text-align: center
      width: 100%
</style>

<template lang="pug">
.story
  a(:href="story.url", target="_BLANK")
    h1.story-title
      | {{ story.title }}
    .story-url
      | {{ story.url }}
  p.story-description
    | {{ story.description }}
</template>

<script>
export default {
  props: {
    story: {
      type: Object
    }
  }
}
</script>

<style lang="sass" scoped>
@import 'assets/branding'

.story-title
  font-size: 24px
  line-height: 1.2
  transition: color 0.1s ease

  &:hover
    color: $color-green

.story-url
  margin-bottom: 10px
  opacity: 0.8
  font-weight: 600

.story-description
  font-size: 18px
  line-height: 1.4
  margin-bottom: 30px
</style>

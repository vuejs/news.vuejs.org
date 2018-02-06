<template lang="pug">
.story
  a.story-link(:href="story.url", target="_BLANK")
    h1.story-title
      | {{ story.title }}
    .story-author(v-if="story.author")
      | {{ story.author }}
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

.story-link

  &:hover
    .story-title
      color: $color-green

.story-title
  font-size: 18px
  line-height: 1.2
  transition: color 0.1s ease

  @media #{$small-up}
    font-size: 24px

.story-author
  margin: 2px 0 7px 0
  font-size: 18px
  font-weight: 600
  color: $color-dark-blue

// .story-url
//   margin-bottom: 10px
//   margin-top: 5px
//   max-width: 100%
//   color: rgba($color-dark-blue, 0.8)
//   font-weight: 400
//   white-space: nowrap
//   overflow: hidden
//   text-overflow: ellipsis
//
//   @media #{$small-up}
//     font-weight: 600

.story-description
  font-size: 15px
  line-height: 1.4
  margin-bottom: 30px
  word-wrap: break-word

  @media #{$small-up}
    font-size: 16px

  @media #{$medium-up}
    font-size: 18px

</style>

<template lang="pug">
  .markdown(v-html="html")
</template>

<script>
import marked from 'marked'

export default {
  props: {
    content: {
      type: String,
      required: true
    }
  },
  computed: {
    html () {
      return marked(this.content)
    }
  }
}
</script>

<style lang="sass">
@import 'assets/branding'

mark
  background: $color-blue
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

  @media #{$small-up}
    font-size: 16px

  @media #{$medium-up}
    font-size: 18px

  a
    font-weight: 600
    color: $color-green

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

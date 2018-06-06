<template lang="pug">
.story
  a.story-link(:href="story.url", target="_blank", rel="noopener")
    h1.story-title
      | {{ story.title }}
  .story-author(v-if="story.author")
    span.tag.story-sponsored(v-if="story.isSponsored") Sponsored
    | {{ story.author }}
  .tags
    span.tag(
      v-for="tag of tags"
    )
      | {{ tag.name }}
  MarkdownRenderer.story-description(
    v-if="story.description && story.description.length"
    :content="story.description"
  )
</template>

<script>
import MarkdownRenderer from '~/components/MarkdownRenderer'

export default {
  components: { MarkdownRenderer },
  props: {
    story: {
      type: Object
    }
  },
  computed: {
    tags () {
      if (!this.story.tags) return []
      return this.story.tags.map(
        tagObj => this.$store.state.tags.find(tag => tag.id === tagObj.sys.id)
      )
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

.tag
  margin-right: 10px
  font-size: 14px
  font-weight: 600
  background: $color-green
  padding: 2px 8px
  color: #fff
  border-radius: 5px
  text-transform: uppercase

.tags
  margin-bottom: 5px

.story-sponsored
  background: #3283d4

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
  margin-bottom: 10px
  word-wrap: break-word

  @media #{$small-up}
    font-size: 16px

  @media #{$medium-up}
    font-size: 18px

</style>

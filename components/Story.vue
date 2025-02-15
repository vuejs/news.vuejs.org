<template lang="pug">
.story
  template(v-if="specialTypeStory")
    component(
      :is="specialTypeStory"
      :story="story"
    )
  template(v-else)
    template(v-if="story.image")
      img.story-image(
        :src="imageUrl"
        :alt="story.title"
      )
    a.story-link(:href="story.url", target="_blank", rel="noopener")
      h1.story-title
        | {{ story.title }}
    .story-author(v-if="story.author")
      span.tag.story-sponsored(v-if="story.isSponsored") Sponsored
      | {{ story.author }}
    .tags
      nuxt-link.tag(
        v-for="tag of tags"
        :key="tag.name"
        :to="`/search?tags=${tag.name}`"
      )
        | {{ tag.name }}
    MarkdownRenderer.story-description(
      v-if="story.description && story.description.length"
      :content="description"
    )
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MarkdownRenderer from '@/components/MarkdownRenderer'

const props = defineProps<{
  story: {
    image?: { fields: { file: { url: string } } }
    title: string
    url: string
    author?: string
    isSponsored?: boolean
    tags?: Array<{ sys: { id: string } }>
    description?: string
  }
  query?: string
}>()

const store = useStore()

const tags = computed(() => {
  if (!props.story.tags) return []
  return props.story.tags.map(
    tagObj => store.tags.find(tag => tag.id === tagObj.sys.id)
  )
})

const tagNames = computed(() => tags.value.map(tag => tag.name))

const queries = computed(() => {
  return props.query?.trim().length
    ? props.query.trim().split(' ')
    : []
})

const description = computed(() => {
  return !queries.value.length
    ? props.story.description
    : queries.value.reduce((desc, query) => {
      return desc.replace(new RegExp(query, 'gi'), `<mark>${query}</mark>`)
    }, props.story.description)
})

const specialTypeStory = computed(() => {
  switch (true) {
    // case tagNames.value.includes('tweet'):
    //   return () => import('@/components/stories/TweetStory')
    default:
      return false
  }
})

const imageUrl = computed(() => {
  if (props.story.image) {
    return `${props.story.image.fields.file.url}?fm=jpg&fl=progressive`
  }
})
</script>

<style lang="sass" scoped>
@use '~/assets/branding'

.story-link

  &:hover
    .story-title
      color: branding.$color-green

.story-title
  font-size: 18px
  line-height: 1.2
  transition: color 0.1s ease

  @media #{branding.$small-up}
    font-size: 24px

.story-author
  margin: 2px 0 7px 0
  font-size: 18px
  font-weight: 600
  color: branding.$color-dark-blue

.tag
  margin-right: 10px
  font-size: 14px
  font-weight: 600
  background: branding.$color-green
  padding: 2px 8px
  color: #fff
  border-radius: 5px
  text-transform: uppercase

.tags
  margin-bottom: 5px

.story-sponsored
  background: #3283d4

.story-image
  max-width: 100%
  margin-bottom: 10px
  border-radius: 5px

.story-url
  margin-bottom: 10px
  margin-top: 5px
  max-width: 100%
  // color: rgba($color-dark-blue, 0.8)
  font-weight: 400
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

  @media #{branding.$small-up}
    font-weight: 600

.story-description
  font-size: 15px
  line-height: 1.4
  margin-bottom: 10px
  word-wrap: break-word

  @media #{branding.$small-up}
    font-size: 16px

  @media #{branding.$medium-up}
    font-size: 18px
</style>

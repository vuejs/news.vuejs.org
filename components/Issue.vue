<template lang="pug">
article.issue
  IssueHeader(:issue="issue")
  .issue-description
    MarkdownRenderer(:content="issue.description")
  //- PlayPodcastButton(v-if="podcastExists", @click="playPodcast")
  hr.hr
  h1.issue-section-header Stories
  Story(v-for="story of stories", :story="story", :key="story.url")
  hr.hr
  h1.issue-section-header Libraries
  Library(v-for="library of libraries", :library="library", :key="library.url")
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Story from './Story'
import Library from './Library'
import PlayPodcastButton from './PlayPodcastButton'
import IssueHeader from '@/components/IssueHeader'
import MarkdownRenderer from '@/components/MarkdownRenderer'

const props = defineProps<{
  issue: {
    issueNumber: number
    description: string
    stories: Array<{ fields: any }>
    podcast: { source: string }
  }
}>()

const store = useStore()

const stories = computed(() => {
  if (!props.issue.stories) return []
  return props.issue.stories
    .filter(story => !story.fields.isLibrary)
    .map(story => story.fields)
})

const libraries = computed(() => {
  if (!props.issue.stories) return []
  return props.issue.stories
    .filter(story => story.fields.isLibrary)
    .map(library => library.fields)
})

const podcastExists = computed(() => !!props.issue.podcast.source)

const playPodcast = () => {
  store.currentPodcastNumber = props.issue.issueNumber
  // eventBus.$emit('play')
}

// onMounted(() => {
//   this.$ga.event('issue', 'open', props.issue.issueNumber)
// })
</script>

<style lang="sass" scoped>
@use '~/assets/branding'

.issue
  padding: 0 0 20px
  margin-bottom: 30px
  border-bottom: 1px solid #eee

.issue-actions
  margin-top: 15px
  display: flex

.issue-section-header
  margin: 20px 0
  font-size: 32px

.issue-player
  margin-top: 10px
  line-height: 40px
  background: #f9f9f9
  padding: 10px 20px
  border-radius: 10px

  img
    width: 40px
    height: 40px
    vertical-align: middle
    margin-right: 10px
    display: inline-block

</style>

<template lang="pug">
article.issue
  IssueHeader(:issue="issue")
  .issue-description
    MarkdownRenderer(:content="issue.description")
  PlayPodcastButton(v-if="podcastExists", @click.native="playPodcast")
  hr.hr
  h1.issue-section-header Stories
  Story(v-for="story of stories", :story="story", :key="story.url")
  hr.hr
  h1.issue-section-header Libraries
  Library(v-for="library of libraries", :library="library", :key="library.url")
</template>

<script>
import Story from './Story'
import Library from './Library'
import PlayPodcastButton from './PlayPodcastButton'
import eventBus from '@/helpers/eventBus'
import IssueHeader from '@/components/IssueHeader'
import MarkdownRenderer from '@/components/MarkdownRenderer'

export default {
  components: { Story, Library, PlayPodcastButton, IssueHeader, MarkdownRenderer },
  props: {
    issue: {
      type: Object
    }
  },
  computed: {
    stories () {
      if (!this.issue.stories) return []
      return this.issue.stories
        .filter(story => !story.fields.isLibrary)
        .map(story => story.fields)
    },
    libraries () {
      if (!this.issue.stories) return []
      return this.issue.stories
        .filter(story => story.fields.isLibrary)
        .map(library => library.fields)
    },
    podcastExists () {
      return !!this.issue.podcast.source
    }
  },
  methods: {
    playPodcast () {
      this.$store.commit('SET_CURRENT_PODCAST', this.issue.issueNumber)
      eventBus.$emit('play')
    }
  },
  mounted () {
    this.$ga.event('issue', 'open', this.issue.issueNumber)
  }
}
</script>

<style lang="sass" scoped>
@import 'assets/branding'

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

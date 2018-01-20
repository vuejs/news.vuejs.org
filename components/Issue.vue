<template lang="pug">
article.issue(:class="{ 'issue-large': isLarge }")
  nuxt-link(:to="{ name: 'issues-number', params: { number: issue.issueNumber } }")
    span.issue-date {{ issueDate }}
    h1.issue-header
      span.issue-number {{ issue.issueNumber }}
      span.issue-title {{ issue.title }}
  p.issue-description {{ issue.description }}
  PlayPodcastButton(@click.native="playPodcast")
  h1.issue-section-header Stories
  Story(v-for="(story, index) of stories", :story="story.fields", key="index")
  h1.issue-section-header Libraries
  Library(v-for="(library, index) of libraries", :library="library.fields", key="index")
</template>

<script>
import Story from './Story'
import Library from './Library'
import PlayPodcastButton from './PlayPodcastButton'
import podcastBus from '~/helpers/podcastBus'

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
function formatDate (publishedOn) {
  const date = new Date(publishedOn)
  return date.toLocaleString('en-US', dateOptions)
}

export default {
  components: { Story, Library, PlayPodcastButton },
  props: {
    issue: {
      type: Object
    },
    isLarge: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    issueDate () {
      return formatDate(this.issue.publishedOn)
    },
    stories () {
      if (!this.issue.stories) return []
      return this.issue.stories.filter(story => !story.fields.isLibrary)
    },
    libraries () {
      if (!this.issue.stories) return []
      return this.issue.stories.filter(story => story.fields.isLibrary)
    }
  },
  methods: {
    playPodcast () {
      this.$store.commit('SET_CURRENT_PODCAST', this.issue.issueNumber)
      podcastBus.$emit('play')
    }
  }
}
</script>

<style lang="sass" scoped>
@import 'assets/branding'
$desktop-up: 'screen and (min-width: 1240px)'

.issue
  padding: 0 0 20px
  margin-bottom: 30px
  border-bottom: 1px solid #eee

.issue-large
  .issue-header
    font-size: 40px

  .issue-action
    font-size: 18px

    img
      height: 30px
      width: 30px

.issue-date
  color: rgba(#34495e, 0.6)
  font-size: 18px
  display: block
  margin-bottom: 5px

.issue-header
  position: relative
  font-size: 28px
  line-height: 1.2
  margin-bottom: 15px
  transition: color ease 0.15s
  cursor: pointer

  &:hover
    color: $color-green

.issue-number
  font-family: 'Dosis'
  font-weight: 500
  font-size: 0.9em
  color: $color-green
  display: inline-block
  margin-right: 6px

  @media #{$desktop-up}
    transform: translateX(-100%)
    position: absolute
    top: 2px
    left: -20px

  &:before
    content: '#'

.issue-description
  font-size: 18px
  line-height: 1.4

.issue-actions
  margin-top: 15px
  display: flex

.issue-section-header
  margin: 20px 0 10px
  font-size: 28px

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

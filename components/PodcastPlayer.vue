<template lang="pug">
.podcast(v-if="podcast")
  ProgressBar(:progress="progress", @update="updateProgress")
  audio.podcast-audio(
    id="player"
    ref="player",
    :src="podcast.source",
    @timeupdate="updateTime"
    @loadeddata="onLoaded"
  )
  .podcast-play-button
    PlayButton(:paused="isPaused", @toggle="togglePlayer")
  .podcast-details
    .podcast-number
      | {{ '#' + podcast.issueNumber }}
    nuxt-link.podcast-title(:to="{ name: 'issues-number', params: { number: podcast.issueNumber } }")
      | {{ podcast.title }}
    .podcast-date
      | {{ podcast.publishedOn }}
</template>

<script>
import PlayButton from './PlayButton'
import ProgressBar from './ProgressBar'
import { mapGetters } from 'vuex'
import podcastBus from '~/helpers/podcastBus'

export default {
  components: { PlayButton, ProgressBar },
  data () {
    return {
      isPaused: true,
      progress: 0,
      totalDuration: 0
    }
  },
  computed: {
    ...mapGetters({
      podcast: 'currentPodcast'
    })
  },
  methods: {
    togglePlayer () {
      this.isPaused = !this.isPaused
    },
    setPosition (event) {
      let tag = event.target
      if (this.paused) return
      const pos = tag.getBoundingClientRect()
      const seekPos = (event.clientX - pos.left) / pos.width
      this.audio.currentTime = parseInt(this.audio.duration * seekPos)
    },
    updateTime () {
      const currentTime = parseFloat(this.$refs.player.currentTime)
      this.progress = parseFloat((currentTime / this.totalDuration) * 100)
    },
    onLoaded () {
      this.totalDuration = parseInt(this.$refs.player.duration)
    },
    updateProgress (seekPos) {
      this.$refs.player.currentTime = parseInt(this.totalDuration * seekPos)
    }
  },
  watch: {
    podcast (newPodcast) {
      this.$refs.player.src = newPodcast.source
    },
    isPaused (isPaused) {
      if (!isPaused) {
        this.$refs.player.play()
      } else {
        this.$refs.player.pause()
      }
    }
  },
  mounted () {
    if (this.podcast) {
      this.$refs.player.src = this.podcast.source
      this.$refs.player.addEventListener('canplay', (e) => {
        if (!this.isPaused) {
          this.$refs.player.play()
        }
      })
    }
    podcastBus.$on('play', () => {
      this.isPaused = false
    })
  }
}
</script>

<style lang="sass" scoped>
@import 'assets/branding'

.podcast
  position: fixed
  bottom: 0
  left: 0
  right: 0
  height: 60px
  display: flex
  padding: 10px 20px
  background: darken($color-dark-blue, 10%)
  border-top: 1px solid #d0d0d0

  &:hover

    /deep/ .podcast-progress-bar
      transform: scaleY(2)

.podcast-audio
  width: 100%

.podcast-details
  display: flex
  width: 100%
  align-items: center

.podcast-number
  font-family: $secondary-font-stack
  font-size: 32px
  color: $color-green
  line-height: 32px
  padding-right: 20px

.podcast-play-button
  padding-right: 10px
  margin-top: -5px

.podcast-date
  font-size: 16px
  width: 100px

.podcast-title
  width: calc(100% - 60px)
  font-size: 20px
  color: #fff
  padding: 0
  margin: 0
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis

  &:hover
    cursor: pointer
    text-decoration: underline
</style>

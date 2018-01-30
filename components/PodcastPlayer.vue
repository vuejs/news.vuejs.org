<template lang="pug">
.podcast(v-if="podcast")
  ProgressBar(:progress="progress", @update="updateProgress")
  audio.podcast-audio(
    id="player"
    ref="player",
    :src="podcast.source",
    @timeupdate="updateTime"
    @loadeddata="onLoaded"
    @ended="nextPodcast"
  )
  button.podcast-player-button(
    title="Step 15s forward"
    @click="stepBackward"
  )
    Icon(icon="backward")
  button.podcast-player-button(
    title="Play/Pause"
    @click="togglePlayer"
  )
    Icon(:icon="isPaused ? 'play' : 'pause'")
  button.podcast-player-button(
    title="Step 15s backward"
    @click="stepForward"
  )
    Icon(icon="forward")
  nuxt-link.podcast-details(
    :to="{ name: 'issues-number', params: { number: podcast.issueNumber } }"
  )
    span.podcast-number
      | {{ '#' + podcast.issueNumber }} | {{ podcast.publishedOn }}
    span.podcast-title
      | {{ podcast.title }}
</template>

<script>
import ProgressBar from './ProgressBar'
import { mapGetters } from 'vuex'
import eventBus from '~/helpers/eventBus'
import Icon from '@fortawesome/vue-fontawesome'

export default {
  components: { ProgressBar, Icon },
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
      // Couldn’t use watch, because of Safar’s autoplay policy
      if (this.isPaused) {
        this.$refs.player.pause()
      } else {
        this.$refs.player.play()
      }
    },
    stepBackward () {
      this.$refs.player.currentTime -= 15
    },
    stepForward () {
      this.$refs.player.currentTime += 15
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
    },
    nextPodcast () {
      this.$store.dispatch('playNextPodcast')
    }
  },
  watch: {
    podcast (newPodcast) {
      this.$refs.player.src = newPodcast.source
    }
  },
  mounted () {
    if (this.podcast) {
      this.$refs.player.src = this.podcast.source
      this.$refs.player.addEventListener('canplay', () => {
        if (!this.isPaused) {
          this.$refs.player.play()
        }
      })
    }
    eventBus.$on('play', () => {
      this.$refs.player.play()
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
  padding: 10px
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
  color: $color-green
  justify-content: flex-end

  @media #{$medium-up}
    justify-content: flex-start

.podcast-number
  font-family: $secondary-font-stack
  font-size: 28px
  line-height: 32px
  padding-right: 10px

  @media #{$medium-up}
    font-size: 32px

.podcast-title
  font-size: 24px
  color: #fff
  display: none
  overflow: hidden
  text-overflow: ellipsis
  max-width: calc(100% - 250px)
  white-space: nowrap

  @media #{$medium-up}
    display: inline-block

.podcast-player-button
  padding-right: 10px
  background: none
  border: none

  &:focus
    outline: none

  svg
    height: 28px
    width: 28px
    margin: 0 0 0 auto
    cursor: pointer
    color: $color-green
</style>

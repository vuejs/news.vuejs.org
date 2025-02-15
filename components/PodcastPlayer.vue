<template lang="pug">
.podcast(v-if="podcastExists")
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
    //- Icon(icon="fast-backward")
  button.podcast-player-button(
    title="Play/Pause"
    @click="togglePlayer"
  )
    //- Icon(:icon="isPaused ? 'play' : 'pause'")
  button.podcast-player-button(
    title="Step 15s backward"
    @click="stepForward"
  )
    //- Icon(icon="fast-forward")
  nuxt-link.podcast-details(
    :to="{ name: 'issues-number', params: { number: podcast.issueNumber } }"
  )
    span.podcast-number
      | {{ '#' + podcast.issueNumber }} | {{ podcast.publishedOn }}
    span.podcast-title
      | {{ podcast.title }}
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

import ProgressBar from './ProgressBar'
// import Icon from '@fortawesome/vue-fontawesome'
// import eventBus from '@/helpers/eventBus'

const store = useStore()

const isPaused = ref(true)
const progress = ref(0)
const totalDuration = ref(0)
const player = ref<HTMLAudioElement | null>(null)

const podcast = computed(() => store.currentPodcast)
const podcastExists = computed(() => podcast.value && podcast.value.source)

const togglePlayer = () => {
  isPaused.value = !isPaused.value
  if (isPaused.value) {
    player.value?.pause()
  } else {
    player.value?.play()
    sendEvent()
  }
}

const stepBackward = () => {
  if (player.value) player.value.currentTime -= 15
}

const stepForward = () => {
  if (player.value) player.value.currentTime += 15
}

const updateTime = () => {
  if (player.value) {
    const currentTime = parseFloat(player.value.currentTime.toString())
    progress.value = parseFloat((currentTime / totalDuration.value) * 100)
  }
}

const onLoaded = () => {
  if (player.value) totalDuration.value = parseInt(player.value.duration.toString())
}

const updateProgress = (seekPos: number) => {
  if (player.value) player.value.currentTime = parseInt((totalDuration.value * seekPos).toString())
}

const nextPodcast = () => {
  store.playNextPodcast()
}

const sendEvent = () => {
  // Assuming $ga is globally available
  window.$ga.event('Podcasts', 'play', `Issue #${podcast.value.issueNumber}`)
}

const initPlayer = () => {
  if (player.value) {
    player.value.src = podcast.value.source
    player.value.addEventListener('canplay', () => {
      if (!isPaused.value) {
        sendEvent()
        player.value.play()
      }
    })
  }
}

watch(podcast, (newPodcast) => {
  if (player.value) player.value.src = newPodcast.source
})

// onMounted(() => {
//   if (podcastExists.value) initPlayer()

//   eventBus.$on('play', () => {
//     if (podcastExists.value) {
//       initPlayer()
//       sendEvent()
//       player.value?.play()
//       isPaused.value = false
//     }
//   })
// })

// onBeforeUnmount(() => {
//   eventBus.$off('play')
// })
</script>

<style lang="sass" scoped>
@use '~/assets/branding'

.podcast
  position: fixed
  bottom: 0
  left: 0
  right: 0
  height: 60px
  display: flex
  padding: 10px
  // background: darken($color-dark-blue, 10%)
  border-top: 1px solid #d0d0d0

  // &:hover

  //   /deep/ .podcast-progress-bar
  //     transform: scaleY(2)

.podcast-audio
  width: 100%

.podcast-details
  display: flex
  width: 100%
  align-items: center
  color: branding.$color-green
  justify-content: flex-end

  @media #{branding.$medium-up}
  //   justify-content: flex-start

.podcast-number
  font-family: branding.$secondary-font-stack
  font-size: 24px
  line-height: 32px
  padding-right: 10px

.podcast-title
  font-size: 18px
  color: #fff
  display: none
  overflow: hidden
  text-overflow: ellipsis
  max-width: calc(100% - 250px)
  white-space: nowrap

  @media #{branding.$medium-up}
  //   display: inline-block

.podcast-player-button
  padding-right: 10px
  background: none
  border: none

  &:focus
    outline: none

  svg
    height: 22px
    width: 22px
    margin: 0 0 0 auto
    cursor: pointer
    color: branding.$color-green

    @media #{branding.$medium-up}
    //   height: 24px
      // width: 24px
</style>

<template lang="pug">
.podcast-player
  audio.podcast-player__audio(:src="currentPodcast.source", controls)
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['currentPodcast'])
}
</script>

<style lang="sass" scoped>
.podcast-player

.podcast-player__audio
  width: 100%
</style>

<template lang="pug">
.story-tweet
  Tweet(
    :id="story.url"
    :options="{ cards: 'hidden', linkColor: '#42b983' }"
  )
    Spinner
</template>

<script>
import { Tweet } from 'vue-tweet-embed'
import Spinner from '@/components/Spinner'

export default {
  components: { Tweet, Spinner },
  props: {
    story: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="sass">

.story-tweet
  position: relative
  min-height: 120px
  margin-bottom: 20px
</style>

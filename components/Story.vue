<template lang="pug">
.story
  h1.story-title
    | {{ story.title }}
  p.story-description
    | {{ story.description }}
</template>

<script>
export default {
  props: {
    story: {
      type: Object
    }
  }
}
</script>

<style lang="sass" scoped>
.story-title
  font-size: 24px
  line-height: 1.2
  margin-bottom: 15px

.story-description
  font-size: 18px
  line-height: 1.4
</style>

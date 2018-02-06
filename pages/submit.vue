<template lang="pug">
.slide-transition
  h1.h1 Submit your story
  p.section
    | Please use the below form to submit your story/library/news. We will review those on a weekly basis.
    br
    | Thanks!
  iframe(
    src="https://docs.google.com/forms/d/e/1FAIpQLSca45g5pbQ4iwVAz4uj0a4kyV0yKytLExexbM5r54j2Fv_V9w/viewform?embedded=true"
    width="100%"
    height="600"
    frameborder="0"
    marginheight="0"
    marginwidth="0"
  )
    | Loading...
</template>

<script>
export default {
  transition (to, from) {
    if (!from) return 'slide-right'
    return +to.query.page < +from.query.page ? 'slide-left' : 'slide-right'
  }
}
</script>

<style lang="sass" scoped>
.section
  margin-bottom: 18px
  font-size: 18px
  line-height: 1.4
</style>

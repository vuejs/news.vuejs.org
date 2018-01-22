<template lang="pug">
.issues-list.slide-transition
  LastIssue
</template>

<script>
import LastIssue from './issues/_number'

export default {
  components: { LastIssue },
  transition (to, from) {
    if (!from) return 'slide-right'
    return +to.query.page < +from.query.page ? 'slide-left' : 'slide-right'
  },
  computed: {
    issues () {
      return this.$store.getters.issues
    },
    issue () {
      return this.issues[0]
    }
  }
}
</script>

<style lang="sass">
.issues-list
  display: block
</style>

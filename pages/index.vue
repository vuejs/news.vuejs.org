<template lang="pug">
.issues-list.slide-transition
  Issue(:issue="issue")
  IssuesNav
</template>

<script>
import Issue from '~/components/Issue'
import IssuesNav from '~/components/IssuesNav'

export default {
  components: { Issue, IssuesNav },
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

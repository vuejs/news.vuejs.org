<template lang="pug">
.slide-transition
  h1.h1 Archive
  IssueHeader(
    v-for="issue of issues"
    :key="issue.issueNumber"
    :issue="issue"
  )
</template>

<script>
import IssueHeader from '~/components/IssueHeader'

export default {
  components: {
    IssueHeader
  },
  transition (to, from) {
    if (!from) return 'slide-right'
    return +to.query.page < +from.query.page ? 'slide-left' : 'slide-right'
  },
  computed: {
    issues () {
      return this.$store.getters.issues
    }
  }
}
</script>

<style lang="sass">
</style>

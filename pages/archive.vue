<template lang="pug">
.slide-transition
  h1.h1 Archive
  IssueHeader(
    v-for="issue of issues"
    :key="issue.issueNumber"
    :issue="issue"
  )
  h2.h2
    | All older issues are available
    |
    a(href="https://www.getrevue.co/profile/vuenewsletter", target="_BLANK")
      | here
    | .
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

<style lang="sass" scoped>
@import '~assets/branding'

.h2
  margin-top: 40px
  padding-top: 40px
  border-top: 1px solid $light-grey

  a
    color: $color-green
</style>

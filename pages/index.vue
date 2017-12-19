<template lang="pug">
.issues-list.slide-transition
  Issue(
    v-for="(issue, index) of issues",
    :issue="issue",
    :key="issue.fields.issueNumber",
    :is-large="index === 0"
  )
</template>

<script>
import Issue from '~/components/Issue'

export default {
  components: { Issue },
  transition (to, from) {
    if (!from) return 'slide-right'
    return +to.query.page < +from.query.page ? 'slide-left' : 'slide-right'
  },
  async fetch ({ store }) {
    await store.dispatch('getIssues')
  },
  computed: {
    issues () {
      return this.$store.state.issues
    }
  }
}
</script>

<style lang="sass">
.issues-list
  display: block
</style>

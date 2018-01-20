<template lang="pug">
.issues-list.slide-transition
  Issue(:issue="issue")
</template>

<script>
import Issue from '~/components/Issue'

export default {
  components: { Issue },
  transition (to, from) {
    if (!from) return 'slide-right'
    return +to.query.page < +from.query.page ? 'slide-left' : 'slide-right'
  },
  async fetch ({ store, isServer }) {
    if (isServer) {
      await Promise.all([
        store.dispatch('getIssues'),
        store.dispatch('getPodcasts')
      ])
    }
  },
  computed: {
    issues () {
      return this.$store.getters.issues
    },
    issue () {
      return this.issues[0]
    }
  },
  mounted () {
    if (!this.issues.length) {
      this.$store.dispatch('getIssues')
      this.$store.dispatch('getPodcasts')
    }
  }
}
</script>

<style lang="sass">
.issues-list
  display: block
</style>

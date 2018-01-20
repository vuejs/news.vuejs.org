<template lang="pug">
.issues-nav
  nuxt-link.issue-nav-link(:to="nextIssue") ← Next issue
  nuxt-link.issue-nav-link(:to="previousIssue") Previous issue →
</template>

<script>
export default {
  computed: {
    issues () {
      return this.$store.getters.issues
    },
    currentIssueNumber () {
      return this.$route.name === 'issues-number'
        ? this.$route.params.number
        : this.issues[0].issueNumber
    },
    previousIssue () {
      return {
        name: 'issues-number',
        params: {
          number: this.currentIssueNumber - 1
        }
      }
    },
    nextIssue () {
      return {
        name: 'issues-number',
        params: {
          number: this.currentIssueNumber + 1
        }
      }
    }
  }
}
</script>

<style lang="sass">
.issues-nav
  display: flex
  justify-content: space-between
  font-size: 18px
  letter-spacing: 1px
</style>

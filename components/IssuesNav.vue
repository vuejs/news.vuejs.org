<template lang="pug">
.issues-nav
  nuxt-link.issue-nav-link.issue-nav-link--previous(
    v-if="nextIssue.exists"
    :to="nextIssue.link"
  ) ← Next issue
  nuxt-link.issues-nav-archive(
    to="/archive"
  ) Archive
  nuxt-link.issue-nav-link.issue-nav-link--next(
    v-if="previousIssue.exists"
    :to="previousIssue.link"
  ) Previous issue →
</template>

<script>
export default {
  computed: {
    issues () {
      return this.$store.getters.issues
    },
    currentIssueNumber () {
      return this.$route.name === 'issues-number'
        ? parseInt(this.$route.params.number)
        : this.issues[0].issueNumber
    },
    currentIndex () {
      return this.issues.findIndex(issue => issue.issueNumber === this.currentIssueNumber)
    },
    previousIssue () {
      const previousIssue = this.issues[this.currentIndex + 1]
      return {
        link: {
          name: 'issues-number',
          params: {
            number: previousIssue && previousIssue.issueNumber
          }
        },
        exists: !!previousIssue
      }
    },
    nextIssue () {
      const nextIssue = this.issues[this.currentIndex - 1]
      return {
        link: {
          name: 'issues-number',
          params: {
            number: nextIssue && nextIssue.issueNumber
          }
        },
        exists: !!nextIssue
      }
    }
  }
}
</script>

<style lang="sass">
@import '~assets/branding'

.issues-nav
  position: relative
  display: block
  width: 100%
  font-size: 18px
  letter-spacing: 1px
  text-align: center

.issues-nav-archive
  width: 100px
  margin-top: 40px
  display: inline-block
  cursor: pointer
  font-size: 18px
  letter-spacing: 1px
  appearance: none
  border: none
  background: none
  color: #34495e
  font-family: $primary-font-stack

  @media #{$medium-up}
    margin-top: 0

.issue-nav-link
  position: absolute

.issue-nav-link--previous
  left: 0

.issue-nav-link--next
  right: 0
</style>

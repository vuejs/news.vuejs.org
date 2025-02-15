<template lang="pug">
.issues-nav
  nuxt-link.issue-nav-link.issue-nav-link--next(
    v-if="previousIssue.exists"
    :to="previousIssue.link"
    ) ← Previous issue
  nuxt-link.issues-nav-archive(
    to="/archive"
  ) Archive
  nuxt-link.issue-nav-link.issue-nav-link--previous(
    v-if="nextIssue.exists"
    :to="nextIssue.link"
    ) Next issue →
</template>

<script setup lang="ts">
import { computed } from 'vue'

const store = useStore()
const route = useRoute()

const issues = computed(() => store.issues)

const currentIssueNumber = computed(() => {
  return route.path === '/issues'
    ? parseInt(route.params.number)
    : issues.value[0].issueNumber
})

const currentIndex = computed(() => {
  return issues.value.findIndex(issue => issue.issueNumber === currentIssueNumber.value)
})

const previousIssue = computed(() => {
  const previousIssue = issues.value[currentIndex.value + 1]
  return {
    link: {
      name: 'issues-number',
      params: {
        number: previousIssue && previousIssue.issueNumber
      }
    },
    exists: !!previousIssue
  }
})

const nextIssue = computed(() => {
  const nextIssue = issues.value[currentIndex.value - 1]
  return {
    link: {
      name: 'issues-number',
      params: {
        number: nextIssue && nextIssue.issueNumber
      }
    },
    exists: !!nextIssue
  }
})
</script>

<style lang="sass">
@use '~/assets/branding'

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
  font-family: branding.$primary-font-stack

  @media #{branding.$medium-up}
  //   margin-top: 0

.issue-nav-link
  position: absolute

.issue-nav-link--previous
  right: 0

.issue-nav-link--next
  left: 0
</style>

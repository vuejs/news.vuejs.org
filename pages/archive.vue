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
    a(href="https://www.getrevue.co/profile/vuenewsletter", target="_blank", rel="noopener")
      | here
    | .
</template>

<script setup lang="ts">
import { computed } from 'vue'
import IssueHeader from '@/components/IssueHeader'

const store = useStore()

const issues = computed(() => store.issues)

definePageMeta({
  transition: (to, from) => {
    if (!from) return 'slide-right'
    return +to.query.page < +from.query.page ? 'slide-left' : 'slide-right'
  }
})
</script>

<style lang="sass" scoped>
@use '~/assets/branding'

.h2
  margin-top: 40px
  padding-top: 40px
  border-top: 1px solid branding.$light-grey

  a
    color: branding.$color-green
</style>

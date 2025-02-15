<template lang="pug">
.slide-transition
  .issue-wrapper
    nuxt-link.go-back-link(
      v-if="$route.params.number"
      to="/"
    ) ← Go back

    transition(name="fade")
      Issue(
        v-if="issue"
        :issue="issue"
      )
      .issue-loading(v-else)
        Spinner
        | Loading!
  IssuesNav
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Issue from '@/components/Issue'
import Story from '@/components/Story'
import Library from '@/components/Library'
import Spinner from '@/components/Spinner'
import { parseDate } from '@/helpers/parsers'
import IssuesNav from '@/components/IssuesNav'

const route = useRoute()
const store = useStore()

const issues = computed(() => store.issues)
const issue = computed(() => issues.value.find(issue => issue.issueNumber === parseInt(route.params.number)))
const issueDate = computed(() => issue.value ? parseDate(issue.value.publishedOn) : '')

function getTitle(issue, issueDate) {
  return issue
    ? `#${issue.issueNumber} ${issueDate} | News — Vue.js`
    : 'News – Vue.js'
}

useHead({
  title: computed(() => getTitle(issue.value, issueDate.value)),
  meta: [
    { property: 'og:title', content: computed(() => getTitle(issue.value, issueDate.value)) },
    { property: 'og:url', content: `https://news.vuejs.org/issues/${issue.value?.issueNumber}` },
    { property: 'og:image', content: 'https://news.vuejs.org/logo.png' },
    { property: 'og:description', content: issue.value?.title },
    { name: 'twitter:title', content: computed(() => getTitle(issue.value, issueDate.value)) },
    { name: 'twitter:description', content: issue.value?.title }
  ]
})
</script>

<style lang="sass" scoped>
.fade-enter-active, .fade-leave-active
  transition: opacity .5s

.fade-enter, .fade-leave-to
  opacity: 0

.issue-wrapper
  position: relative
  min-height: 400px

.issue-loading
  position: absolute
  min-height: 400px
  width: 100%

.go-back-link
  position: absolute
  top: -40px
</style>

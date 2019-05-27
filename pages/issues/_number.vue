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

<script>
import Issue from '@/components/Issue'
import Story from '@/components/Story'
import Library from '@/components/Library'
import Spinner from '@/components/Spinner'
import { parseDate } from '@/helpers/parsers'
import IssuesNav from '@/components/IssuesNav'

function getTitle (issue, issueDate) {
  return issue
    ? `#${issue.issueNumber} ${issueDate} | News — Vue.js`
    : 'News – Vue.js'
}

export default {
  components: { Issue, Story, Library, Spinner, IssuesNav },
  transition (to, from) {
    if (!from) return 'slide-left'
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },
  head () {
    return {
      title: getTitle(this.issue, this.issueDate),
      meta: [
        { property: 'og:title', content: getTitle(this.issue, this.issueDate) },
        { property: 'og:url', content: `https://news.vuejs.org/issues/${this.issue.issueNumber}` },
        { property: 'og:image', content: 'https://news.vuejs.org/logo.png' },
        { property: 'og:description', content: this.issue.title },
        { 'name': 'twitter:title', content: getTitle(this.issue, this.issueDate) },
        { 'name': 'twitter:description', content: this.issue.title }
      ]
    }
  },
  computed: {
    issues () {
      return this.$store.getters.issues
    },
    issue () {
      return this.issues.find(issue => issue.issueNumber === parseInt(this.$route.params.number))
    },
    issueDate () {
      return this.issue
        ? parseDate(this.issue.publishedOn)
        : ''
    }
  }
}
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

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
import api from '~/api'
import Issue from '~/components/Issue'
import Story from '~/components/Story'
import Library from '~/components/Library'
import Spinner from '~/components/Spinner'
import { flattenIssue, parseDate } from '~/helpers/parsers'
import IssuesNav from '~/components/IssuesNav'

function getTitle (issue, issueDate) {
  return issue
    ? `#${issue.issueNumber} ${issueDate} | News — Vue.js`
    : 'News – Vue.js'
}

async function getIssue (issueNumber) {
  return flattenIssue(await api.getIssueByNumber(issueNumber))
}

export default {
  components: { Issue, Story, Library, Spinner, IssuesNav },
  transition (to, from) {
    if (!from) return 'slide-left'
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },
  head () {
    return {
      title: getTitle(this.issue, this.issueDate)
    }
  },
  data () {
    return {
      issue: null
    }
  },
  computed: {
    issues () {
      return this.$store.getters.issues
    },
    issueDate () {
      return this.issue
        ? parseDate(this.issue.publishedOn)
        : ''
    }
  },
  async fetch ({ store }) {
    await store.dispatch('getPodcasts')
  },
  async asyncData ({ isStatic, params }) {
    if (isStatic) {
      const issue = params.number
        ? await getIssue(params.number)
        : this.issues[0]
      return {
        issue
      }
    }
  },
  async mounted () {
    if (!this.issue) {
      this.issue = await getIssue(this.$route.params.number)
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

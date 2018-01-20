<template lang="pug">
.issue-wrapper.slide-transition
  nuxt-link.go-back-link(to="/") ← Go back

  div(v-if="issue")
    Issue(:issue="issue", :is-large="true")
  .issue-loading(v-else)
    | Loading!
</template>

<script>
import api from '~/api'
import Issue from '~/components/Issue'
import Story from '~/components/Story'
import Library from '~/components/Library'
import { flattenIssue } from '~/helpers/parsers'

function getTitle (issue) {
  return issue
    ? issue.title + ' | News — Vue.js'
    : 'News – Vue.js'
}

export default {
  components: { Issue, Story, Library },
  transition (to, from) {
    if (!from) return 'slide-left'
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },
  head () {
    return {
      title: getTitle(this.issue)
    }
  },
  data () {
    return {
      issue: null
    }
  },
  async fetch ({ store }) {
    await store.dispatch('getPodcasts')
  },
  async asyncData ({ isServer, params }) {
    if (isServer) {
      const issue = await api.getIssueByNumber(params.number)
      return {
        issue: flattenIssue(issue)
      }
    }
  },
  async mounted () {
    if (!this.issue) {
      const issue = await api.getIssueByNumber(this.$route.params.number)
      this.issue = flattenIssue(issue)
    }
  }
}
</script>

<style lang="sass" scoped>
.issue-wrapper
  position: relative

.go-back-link
  position: absolute
  top: -40px
</style>

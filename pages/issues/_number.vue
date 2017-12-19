<template lang="pug">
.issue-wrapper.slide-transition
  nuxt-link.go-back-link(to="/") ← Go back

  div(v-if="issue")
    Issue(:issue="issue", :is-large="true")
    Story(v-for="(story, index) of stories", :story="story.fields", key="index")
    h1.issue-libraries Libraries
    Library(v-for="(library, index) of libraries", :library="library.fields", key="index")
  .issue-loading(v-else)
    | Loading!
</template>

<script>
import api from '~/api'
import Issue from '~/components/Issue'
import Story from '~/components/Story'
import Library from '~/components/Library'

export default {
  components: { Issue, Story, Library },
  transition (to, from) {
    if (!from) return 'slide-left'
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },
  head () {
    return {
      title: this.issue.fields.title + ' | News — Vue.js'
    }
  },
  data () {
    return {
      issue: {
        fields: {
          title: 'Vue.js News'
        }
      }
    }
  },
  async asyncData ({ isServer, params }) {
    if (isServer) {
      const issue = await api.getIssueByNumber(params.number)
      return {
        issue
      }
    }
  },
  computed: {
    stories () {
      return this.issue.fields.stories.filter(story => !story.fields.isLibrary)
    },
    libraries () {
      return this.issue.fields.stories.filter(story => story.fields.isLibrary)
    }
  },
  async mounted () {
    this.issue = await api.getIssueByNumber(this.$route.params.number)
  }
}
</script>

<style lang="sass" scoped>
.issue-wrapper
  position: relative

.issue-libraries
  margin: 20px 0 10px

.go-back-link
  position: absolute
  top: -40px
</style>

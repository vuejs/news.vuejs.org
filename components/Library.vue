<template lang="pug">
.library
  h1.library-title
    | {{ `${owner}/${repo}` }}
  .library-stats
    .library-stars ★ {{ stars }}
  p.library-description
    | {{ library.description }}
</template>

<script>
import axios from 'axios'

function getRepoData (url) {
  // eslint-disable-next-line no-unused-vars
  const [repo, owner, ...rest] = url.replace(/\/$/, '').split('/').reverse()
  return { owner, repo }
}

export default {
  props: {
    library: {
      type: Object
    }
  },
  data () {
    return {
      githubStats: null
    }
  },
  computed: {
    owner () {
      const { owner } = getRepoData(this.library.url)
      return owner
    },
    repo () {
      const { repo } = getRepoData(this.library.url)
      return repo
    },
    stars () {
      return this.githubStats ? this.githubStats.stargazers_count : 0
    }
  },
  async mounted () {
    this.githubStats = (await axios.get(`https://api.github.com/repos/${this.owner}/${this.repo}`)).data
  }
}
</script>

<style lang="sass" scoped>
.library-title
  font-size: 24px
  line-height: 1.2
  margin-bottom: 0

.library-stats
  margin: 5px 0
  font-weight: 600
  font-size: 16px

.library-description
  font-size: 18px
  line-height: 1.4
</style>

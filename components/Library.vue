<template lang="pug">
.library
  a.library-link(:href="library.url", target="_BLANK")
    h1.library-title
      | {{ title }}
    //- TODO: Uncomment once GitHub app has been created
    //- .library-stats(v-if="stars || stars === 0")
    //-   .library-stars ★ {{ stars }}
    .library-url
      | {{ library.url }}
  p.library-description
    | {{ library.description }}
</template>

<script>
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
    isGitHubRepo () {
      return this.library.url.indexOf('github.com/') !== -1
    },
    title () {
      return this.isGitHubRepo
        ? `${this.owner}/${this.repo}`
        : this.library.title
    },
    owner () {
      const { owner } = getRepoData(this.library.url)
      return owner
    },
    repo () {
      const { repo } = getRepoData(this.library.url)
      return repo
    }
    // stars () {
    //   if (!this.isGitHubRepo) return false
    //   return this.githubStats ? this.githubStats.stargazers_count : 0
    // }
  },
  async mounted () {
    // TODO: Uncomment once GitHub app has been created
    // if (this.isGitHubRepo) {
    //   this.githubStats = (await axios.get(`https://api.github.com/repos/${this.owner}/${this.repo}`)).data
    // }
  }
}
</script>

<style lang="sass" scoped>
@import 'assets/branding'

.library-title
  font-size: 18px
  line-height: 1.2
  margin-bottom: 0

  @media #{$small-up}
    font-size: 24px

.library-link
  display: block

  &:hover
    .library-title
      color: $color-green

.library-stats,
.library-url
  opacity: 0.8
  display: inline-block
  margin: 0 10px 5px 0
  font-size: 14px

  @media #{$small-up}
    font-size: 16px
    font-weight: 600

.library-description
  font-size: 15px
  line-height: 1.4
  margin-bottom: 30px

  @media #{$small-up}
    font-size: 16px

  @media #{$medium-up}
    font-size: 18px
</style>

<template lang="pug">
.library
  a.library-link(:href="library.url", target="_blank", rel="noopener")
    h1.library-title
      | {{ library.title }}
    //- TODO: Uncomment once GitHub app has been created
    //- .library-stats(v-if="stars || stars === 0")
    //-   .library-stars ★ {{ stars }}
    .library-url
      | {{ library.url }}
  p.library-description
    | {{ library.description }}
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  library: {
    url: string
    title: string
    description: string
  }
}>()

function getRepoData(url: string) {
  const [repo, owner] = url.replace(/\/$/, '').split('/').reverse()
  return { owner, repo }
}

const isGitHubRepo = computed(() => props.library.url.indexOf('github.com/') !== -1)

const title = computed(() => isGitHubRepo.value ? `${owner.value}/${repo.value}` : props.library.title)

const owner = computed(() => getRepoData(props.library.url).owner)

const repo = computed(() => getRepoData(props.library.url).repo)

const stars = computed(() => {
  if (!isGitHubRepo.value) return false
  return githubStats.value ? githubStats.value.stargazers_count : 0
})

const githubStats = ref(null)

// onMounted(async () => {
//   if (isGitHubRepo.value) {
//     githubStats.value = (await axios.get(`https://api.github.com/repos/${owner.value}/${repo.value}`)).data
//   }
// })
</script>

<style lang="sass" scoped>
@use '~/assets/branding'

.library-title
  font-size: 18px
  line-height: 1.2
  margin-bottom: 0

  @media #{branding.$small-up}
    font-size: 24px

.library-link
  display: block

  &:hover
    .library-title
      color: branding.$color-green

.library-stats,
.library-url
  opacity: 0.8
  display: inline-block
  margin: 0 10px 5px 0
  font-size: 14px

  @media #{branding.$small-up}
    font-size: 16px
    font-weight: 600

.library-description
  font-size: 15px
  line-height: 1.4
  margin-bottom: 30px

  @media #{branding.$small-up}
    font-size: 16px

  @media #{branding.$medium-up}
    font-size: 18px
</style>

import { defineStore } from 'pinia'
import { flattenIssue, flattenPodcast, flattenTag } from '@/helpers/parsers'
import { useNuxtApp } from '#app'

export const useStore = defineStore('store', {
  state: () => ({
    issuesList: [] as any[],
    podcasts: [] as any[],
    currentPodcastNumber: 0,
    tags: [] as any[]
  }),
  actions: {
    async nuxtServerInit() {
      await Promise.all([
        this.getIssues(),
        // this.getPodcasts(),
        this.getTags()
      ])
    },
    async getTags() {
      const { $api } = useNuxtApp()

      if (this.tags.length !== 0) return
      const tags = await $api.getTags()
      this.tags = tags.map(flattenTag)
    },
    async getIssues() {
      const { $api } = useNuxtApp()

      if (this.issuesList.length !== 0) return
      const issues = await $api.getIssues()
      this.issuesList = issues.map(flattenIssue)
    },
    async getPodcasts() {
      const { $api } = useNuxtApp()

      if (this.podcasts.length !== 0) return
      const podcasts = await $api.getPodcasts()
      console.log('podcasts', podcasts)
      const flatPodcasts = podcasts
        .map(flattenPodcast)
        .concat()
        .sort((a, b) => b.issueNumber - a.issueNumber)
      this.podcasts = flatPodcasts
      this.currentPodcastNumber = flatPodcasts[0].issueNumber
    },
    playNextPodcast() {
      const nextIssue = this.podcasts.find(podcast => podcast.issueNumber === this.currentPodcastNumber - 1)
      if (nextIssue) {
        this.currentPodcastNumber = nextIssue.issueNumber
      } else {
        const lastPodcastIndex = this.podcasts.length - 1
        this.currentPodcastNumber = this.podcasts[lastPodcastIndex].issueNumber
      }
    }
  },
  getters: {
    currentPodcast: (state) => state.podcasts.find(podcast => podcast.issueNumber === state.currentPodcastNumber),
    issues: (state) => state.issuesList.concat().sort((a, b) => a.issueNumber < b.issueNumber ? 1 : -1)
  }
})

import Vuex from 'vuex'
import api from '../api/index'
import { flattenIssue, flattenPodcast } from '~/helpers/parsers'

function sortByIssueNumber (a, b) {
  return a.issueNumber < b.issueNumber ? 1 : -1
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      issuesList: [],
      podcasts: [],
      currentPodcastNumber: 0
    },
    actions: {
      nuxtServerInit ({ dispatch }) {
        return Promise.all([
          dispatch('getIssues'),
          dispatch('getPodcasts')
        ])
      },
      async getIssues ({ commit, state }) {
        if (state.issuesList.length !== 0) return false
        const issues = await api.getIssues()
        commit('SET_ISSUES', issues.map(flattenIssue))
      },
      async getPodcasts ({ commit, state }) {
        if (state.podcasts.length !== 0) return false
        const podcasts = await api.getPodcasts()
        const flatPodcasts = podcasts
          .map(flattenPodcast)
          .sort((a, b) => b.issueNumber - a.issueNumber)
        commit('SET_PODCASTS', flatPodcasts)
        commit('SET_CURRENT_PODCAST', flatPodcasts[0].issueNumber)
      },
      playNextPodcast ({ commit, state }) {
        const nextIssue = state.podcasts.find(podcast => podcast.issueNumber === state.currentPodcastNumber + -1)
        if (nextIssue) {
          commit('SET_CURRENT_PODCAST', nextIssue.issueNumber)
        } else {
          const lastPodcastIndex = state.podcasts.length - 1
          commit('SET_CURRENT_PODCAST', state.podcasts[lastPodcastIndex].issueNumber)
        }
      }
    },
    getters: {
      currentPodcast: state => state.podcasts.find(podcast => podcast.issueNumber === state.currentPodcastNumber),
      issues: state => state.issuesList.sort(sortByIssueNumber)
    },
    mutations: {
      SET_ISSUES (state, issues) {
        state.issuesList = issues
      },
      SET_PODCASTS (state, podcasts) {
        state.podcasts = podcasts
      },
      SET_CURRENT_PODCAST (state, issueNumber) {
        state.currentPodcastNumber = issueNumber
      }
    }
  })
}

export default createStore

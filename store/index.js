import Vuex from 'vuex'
import api from '../api/index'

const createStore = () => {
  return new Vuex.Store({
    state: {
      issues: []
    },
    actions: {
      async getIssues ({ commit, state }) {
        if (state.issues.length !== 0) return false
        const issues = await api.getIssues()
        commit('SET_ISSUES', issues)
      }
    },
    mutations: {
      SET_ISSUES (state, issues) {
        state.issues = issues
      }
    }
  })
}

export default createStore

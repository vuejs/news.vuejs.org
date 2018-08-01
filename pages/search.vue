<template lang="pug">
.slide-transition
  h1.h1 Archive search
  p.p Find the stories you need
  input.search-input.multiselect__input(
    v-model="query"
    type="text"
    placeholder="Type to search"
    @keyup.enter="updateQuery"
  )
  Multiselect(
    :searchable="false"
    :value="selectedTags"
    :multiple="true"
    :options="tags"
    :close-on-select="false"
    track-by="id"
    label="name"
    placeholder="Select tags"
    @input="updateTags"
  )
  button.button.search-button(
    tabindex="0"
    type="button"
    @click="updateQuery"
  )
    | Search
  template(v-if="!isLoading")
    Story(
      v-for="story of stories"
      :story="story.fields"
      :query="query"
    )
  .search-loading(v-else)
    Spinner
</template>

<script>
import api from '../api/index'
import Story from '~/components/Story'
import Multiselect from 'vue-multiselect'
import Spinner from '~/components/Spinner'
import { mapState } from 'vuex'

export default {
  components: { Story, Multiselect, Spinner },
  data () {
    return {
      isLoading: false,
      query: '',
      selectedTagNames: [],
      stories: []
    }
  },
  computed: {
    ...mapState(['tags']),
    selectedTags () {
      return this.tags.filter(tag => this.selectedTagNames.includes(tag.name))
    }
  },
  methods: {
    async searchStories () {
      this.isLoading = true
      try {
        this.stories = await api.getStoriesByContent(this.query, this.selectedTags)
      } catch (e) {
        console.error(e)
      }
      this.isLoading = false
    },
    updateQuery () {
      this.$router.push({
        query: {
          q: this.query,
          tags: this.selectedTagNames
        }
      })
    },
    updateTags (tags) {
      this.selectedTagNames = tags.map(tag => tag.name)
    }
  },
  watch: {
    '$route.query': 'searchStories'
  },
  created () {
    if (this.$route.query.tags) {
      this.selectedTagNames = this.$route.query.tags
    }

    if (this.$route.query.q) {
      this.query = this.$route.query.q
    }

    if (this.query || this.selectedTagNames.length) {
      this.searchStories()
    }
  }
}
</script>

<style lang="sass" scoped>
.p
  margin-bottom: 20px

.search-form
  position: relative
  display: flex
  align-items: center

.search-input
  border: 1px solid #e8e8e8
  min-height: 40px
  padding: 0 13px
  margin-right: 20px
  margin-bottom: 20px

.search-button
  margin: 20px 0

.search-loading
  position: relative
  margin-top: 40px
</style>

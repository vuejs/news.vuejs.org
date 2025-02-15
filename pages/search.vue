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
  //- Multiselect(
  //-   :searchable="false"
  //-   :value="selectedTags"
  //-   :multiple="true"
  //-   :options="tags"
  //-   :close-on-select="false"
  //-   track-by="id"
  //-   label="name"
  //-   placeholder="Select tags"
  //-   @input="updateTags"
  //- )
  button.button.search-button(
    tabindex="0"
    type="button"
    @click="updateQuery"
  )
    | Search
  template(v-if="!isLoading")
    Story(
      v-for="story of stories"
      :key="story.url"
      :story="story.fields"
      :query="query"
    )
  .search-loading(v-else)
    Spinner
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
// import api from '../api/index'
import Story from '@/components/Story'
// import Multiselect from 'vue-multiselect'
import Spinner from '@/components/Spinner'

const store = useStore()

const isLoading = ref(false)
const query = ref('')
const selectedTagNames = ref<string[]>([])
const stories = ref([])

const tags = computed(() => store.tags)

const selectedTags = computed(() => {
  return tags.value.filter(tag => selectedTagNames.value.includes(tag.name))
})

const searchStories = async () => {
  isLoading.value = true
  try {
    // stories.value = await api.getStoriesByContent(query.value, selectedTags.value)
  } catch (e) {
    console.error(e)
  }
  isLoading.value = false
}

const updateQuery = () => {
  router.push({
    query: {
      q: query.value,
      tags: selectedTagNames.value
    }
  })
}

const updateTags = (tags: any[]) => {
  selectedTagNames.value = tags.map(tag => tag.name)
}

watch(() => route.query, searchStories)

onMounted(() => {
  if (route.query.tags) {
    selectedTagNames.value = route.query.tags
  }

  if (route.query.q) {
    query.value = route.query.q
  }

  if (query.value || selectedTagNames.value.length) {
    searchStories()
  }
})
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

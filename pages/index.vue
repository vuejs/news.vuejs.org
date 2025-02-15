<template lang="pug">
.issues-list.slide-transition
  Issue(:issue="issue")
  IssuesNav
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Issue from '@/components/Issue'
import IssuesNav from '@/components/IssuesNav'

const store = useStore()

const issue = computed(() => store.issues[0])

definePageMeta({
  transition: (to, from) => {
    if (!from) return 'slide-right'
    return +to.query.page < +from.query.page ? 'slide-left' : 'slide-right'
  }
})
</script>

<style lang="sass">
.issues-list
  display: block
</style>

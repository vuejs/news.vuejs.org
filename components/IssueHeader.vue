<template lang="pug">
nuxt-link(:to="{ name: 'issues-number', params: { number: issue.issueNumber } }")
  h1.issue-header
    span.issue-number {{ issue.issueNumber }}
    span.issue-date {{ issueDate }}
    .issue-title {{ issue.title }}
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { parseDate } from '@/helpers/parsers'

const props = defineProps<{
  issue: {
    issueNumber: number
    publishedOn: string
    title: string
  }
}>()

const issueDate = computed(() => parseDate(props.issue.publishedOn))
</script>

<style lang="sass">
@use '~/assets/branding'

.issue-title
  font-weight: 400
  font-size: 20px
  display: block
  margin: 5px 0

.issue-header
  position: relative
  font-size: 28px
  line-height: 1.2
  margin-bottom: 15px
  transition: color ease 0.15s
  cursor: pointer

  &:hover
    color: branding.$color-green

.issue-number
  font-family: branding.$secondary-font-stack
  font-weight: 500
  font-size: 0.9em
  color: branding.$color-green
  display: inline-block
  margin-right: 6px

  @media #{branding.$large-up}
    transform: translateX(-100%)
    position: absolute
    top: 2px
    left: -20px

  &:before
    content: '#'
</style>

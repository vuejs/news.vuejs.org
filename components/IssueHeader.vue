<template lang="pug">
nuxt-link(:to="{ name: 'issues-number', params: { number: issue.issueNumber } }")
  h1.issue-header
    span.issue-number {{ issue.issueNumber }}
    span.issue-date {{ issueDate }}
    .issue-title {{ issue.title }}
</template>

<script>
import { parseDate } from '~/helpers/parsers'

export default {
  props: {
    issue: {
      type: Object,
      required: true
    }
  },
  computed: {
    issueDate () {
      return parseDate(this.issue.publishedOn)
    }
  }
}
</script>

<style lang="sass">
@import '~assets/branding'

.issue-title
  font-weight: 400
  font-size: 20px
  display: block
  margin-bottom: 5px

.issue-header
  position: relative
  font-size: 28px
  line-height: 1.2
  margin-bottom: 15px
  transition: color ease 0.15s
  cursor: pointer

  &:hover
    color: $color-green

.issue-number
  font-family: 'Dosis'
  font-weight: 500
  font-size: 0.9em
  color: $color-green
  display: inline-block
  margin-right: 6px

  @media #{$large-up}
    transform: translateX(-100%)
    position: absolute
    top: 2px
    left: -20px

  &:before
    content: '#'
</style>

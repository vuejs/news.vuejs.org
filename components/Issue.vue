<template lang="pug">
article.issue(:class="{ 'issue-large': isLarge }")
  nuxt-link(:to="{ name: 'issues-number', params: { number: issue.issueNumber } }")
    span.issue-date {{ issueDate }}
    h1.issue-header
      span.issue-number {{ issue.issueNumber }}
      span.issue-title {{ issue.title }}
    p.issue-description {{ issue.description }}
  .issue-player(v-if="isLarge")
    img(src="~assets/images/vue-play-button.svg" alt="Play button")
    | Player
  .issue-actions(v-else)
    button.issue-action(type="button")
      img(src="~assets/images/vue-play-button.svg" alt="Play button")
      span Play
    button.issue-action(type="button")
      img(src="~assets/images/vue-play-button.svg" alt="Play button")
      span Read
    button.issue-action(type="button")
      img(src="~assets/images/vue-play-button.svg" alt="Play button")
      span Share
</template>

<script>
const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
function formatDate (publishedOn) {
  const date = new Date(publishedOn)
  return date.toLocaleString('en-US', dateOptions)
}

export default {
  props: {
    issue: {
      type: Object
    },
    isLarge: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    issueDate () {
      return formatDate(this.issue.publishedOn)
    }
  }
}
</script>

<style lang="sass" scoped>
$desktop-up: 'screen and (min-width: 1240px)'

.issue
  padding: 0 0 20px
  margin-bottom: 30px
  border-bottom: 1px solid #eee

.issue-large
  .issue-header
    font-size: 40px

  .issue-action
    font-size: 18px

    img
      height: 30px
      width: 30px

.issue-date
  color: rgba(#34495e, 0.6)
  font-size: 18px
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
    color: #42b983

.issue-number
  font-family: 'Dosis'
  font-weight: 500
  font-size: 0.9em
  color: #42b983
  display: inline-block
  margin-right: 6px

  @media #{$desktop-up}
    transform: translateX(-100%)
    position: absolute
    top: 2px
    left: -20px

  &:before
    content: '#'

.issue-description
  font-size: 18px
  line-height: 1.4

.issue-actions
  margin-top: 15px
  display: flex

.issue-action
  background: none
  border: none
  padding: 10px
  margin-right: 30px
  font:
    size: 16px
    weight: 600
  color: #34495e
  cursor: pointer

  &:hover
    opacity: 0.8

  img
    width: 20px
    height: 20px
    vertical-align: middle
    margin-right: 10px
    line-height: 30px
    display: inline-block

  span
    display: inline-block
    line-height: 30px
    vertical-align: middle

.issue-player
  margin-top: 10px
  line-height: 40px
  background: #f9f9f9
  padding: 10px 20px
  border-radius: 10px

  img
    width: 40px
    height: 40px
    vertical-align: middle
    margin-right: 10px
    display: inline-block

</style>

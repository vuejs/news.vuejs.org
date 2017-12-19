<template lang="pug">
.sidebar
  .sidebar__box
    h1.h1 The Official Vue News
    p.p
      | We exist to provide Vue developers with the latest news and tutorials to stay up-to-date with their technology. If you’d like to get invlovled please visit our
      |
      a.link(href="") Discord channel

  h2.sidebar-header Get a weekly email
  form.newsletter-form(@submit="subscribe")
    input.newsletter-input(
      v-model="email",
      type="text",
      placeholder="Email address",
      required
    )
    button.newsletter-button(type="submit") Subscribe
    small.small Previously known as Vue.js Newsletter

  h2.sidebar-header Listen to the latest podcast
  PodcastPlayer
</template>

<script>
import PodcastPlayer from '~/components/PodcastPlayer'

export default {
  components: { PodcastPlayer },
  data () {
    return {
      email: ''
    }
  },
  methods: {
    subscribe () {
      console.log('You just subscribed!')
    }
  }
}
</script>

<style lang="sass">
.sidebar__box
  background: #f9f9f9
  padding: 30px
  border-radius: 5px

.h1
  margin-bottom: 10px

.p
  font-size: 18px

.newsletter-form
  position: relative

.newsletter-input
  width: 100%
  height: 44px
  padding: 10px 80px 10px 20px
  border-radius: 50px
  border: 1px solid #ccc
  font-size: 18px
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif

  &:focus
    outline: none
    border-color: #42b983

.newsletter-button
  position: absolute
  padding: 4px 20px
  right: 4px
  top: 4px
  height: 36px
  background: #42b983
  border: none
  color: #fff
  border-radius: 50px
  font-family: 'Dosis'
  font-size: 16px
  font-weight: 600
  text-transform: uppercase

.small
  display: block
  margin: 5px 20px

.sidebar-header
  font-size: 20px
  font-weight: 600
  margin: 40px 0 10px
</style>

<template lang="pug">
div
  h2.sidebar-header Get a weekly email
  form.newsletter-form(
    id="revue-form"
    name="revue-form"
    target="_blank"
    action="https://www.getrevue.co/profile/vuenewsletter/add_subscriber"
    method="post"
    @submit="subscribe"
  )
    input.newsletter-input(
      type="email"
      name="member[email]"
      id="member_email"
      required
      placeholder="Email address",
    )
    input.button.newsletter-button(
      type="submit"
      value="Subscribe"
      name="member[subscribe]"
      id="member_submit"
    )
    small.small Previously known as Vue.js Newsletter

  h2.sidebar-header Subscribe to the podcast
  .podcast-list
    a.button.podcast-subscribe(
      href="https://itunes.apple.com/us/podcast/the-official-vue-news/id1329151772"
      target="_blank"
      @click="subscribe"
    )
      | Apple Podcasts
    a.button.podcast-subscribe(
      href="https://subscribeonandroid.com/vuenews.fireside.fm/rss"
      target="_blank"
      @click="subscribe"
    )
      | Android
    a.button.podcast-subscribe(
      href="https://www.stitcher.com/podcast/code-pop/the-official-vue-news"
      target="_blank"
      @click="subscribe"
    )
      | Stitcher
    a.button.podcast-subscribe(
      href="https://vuenews.fireside.fm/rss"
      target="_blank"
      @click="subscribe"
    )
      | RSS
</template>

<script>
export default {
  methods: {
    subscribe () {
      localStorage.setItem('subscribed', true)
      this.$ga.event('podcast', 'subscribe', 'Subscribed to podcast', true)
    }
  }
}
</script>

<style lang="sass">
@import '~assets/branding'

.newsletter-form
  position: relative

.newsletter-input
  width: 100%
  height: 46px
  padding: 10px 80px 10px 20px
  border-radius: 50px
  border: 1px solid #ccc
  font-size: 18px
  font-family: $primary-font-stack

  &:focus
    outline: none
    border-color: #42b983

.newsletter-button
  position: absolute
  padding: 4px 20px
  right: 4px
  top: 4px
  background: $color-green
  color: #fff
  font-weight: 600

.small
  display: block
  margin: 5px 20px

.podcast-list
  display: block

.podcast-subscribe
  font-size: 12px
  padding: 5px 20px
  margin: 0 10px 10px 0
  display: inline-block
</style>

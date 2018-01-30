<template lang="pug">
.sidebar
  .sidebar__box
    h1.h1 The Official Vue News
    p.p
      | We exist to provide Vue developers with the latest news and tutorials to stay up-to-date with their technology.
      //- |  If you’d like to get invlovled please visit our
      //- |
      //- a.link(href="") Discord channel

  h2.sidebar-header Get a weekly email
  form.newsletter-form(
    id="revue-form"
    name="revue-form"
    target="_blank"
    action="https://www.getrevue.co/profile/vuenewsletter/add_subscriber"
    method="post"
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
    )
      | Apple Podcasts
    a.button.podcast-subscribe(
      href="https://subscribeonandroid.com/vuenews.fireside.fm/rss"
      target="_blank"
    )
      | Android
    a.button.podcast-subscribe(
      href="https://vuenews.fireside.fm/rss"
      target="_blank"
    )
      | RSS
</template>

<script>
</script>

<style lang="sass">
@import '~assets/branding'

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

.sidebar-header
  font-size: 20px
  font-weight: 600
  margin: 40px 0 10px

.podcast-list
  display: block

.podcast-subscribe
  font-size: 12px
  padding: 5px 20px
  margin: 0 10px 10px 0
  display: inline-block
</style>

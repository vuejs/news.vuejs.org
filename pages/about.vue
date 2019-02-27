<template lang="pug">
.slide-transition
  h1.h1 About
  p.section
    | The Vue.js News project aims to highlight some of the best libraries, articles, and resources from around the Vue.js community.
    | Our goal is to help you succeed as a developer by giving you the information you need to grow, learn, and use the latest Vue.js techniques.
  p.section
    | At the moment the Vue News team includes:
  ul.list
    li
      a.link(href="https://twitter.com/damiandulisz") Damian Dulisz
      | (Vue Core Team)
    li
      a.link(href="https://twitter.com/greggpollack") Gregg Pollack
      | (Vue Mastery)
    li
      a.link(href="https://twitter.com/AdamJahr") Adam Jahr
      | (Vue Mastery)
  p.sponsors
    | The production of the newsletter and podcast is graciously sponsored by:
  p.sponsors.logos
    a.logo-link.logo-vuemastery(href="http://www.vuemastery.com/")
      img(src="~assets/images/vue-mastery-logo.png")
</template>

<script>
export default {
  transition (to, from) {
    if (!from) return 'slide-right'
    return +to.query.page < +from.query.page ? 'slide-left' : 'slide-right'
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/branding'

.link
  color: $color-green
  margin-right: 8px

.section, .list, .sponsors
  margin-bottom: 18px

.section, .sponsors, .list
  font-size: 15px
  line-height: 1.4

  @media #{$small-up}
    font-size: 16px

  @media #{$medium-up}
    font-size: 18px

.logos
  text-align: center

.logo-link
  position: relative

  img
    height: 2.4em

@media #{$mini-only}
  .logo-and
    display: block
    position: relative
    top: 0.6em

.logo-monterail
  top: 0.6em
  margin-right: 1em

.logo-vuemastery
  top: 0.5em
  margin-left: 0.8em
</style>

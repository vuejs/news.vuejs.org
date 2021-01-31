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

  h2.h2 Sponsors
  p.section
    | Help the project and become a
    |
    a.link(href="https://github.com/sponsors/shentao") sponsor
    | using GitHub Sponsors.

  h3.h3 Gold
  p.sponsors.logos
    a.logo-link.logo-vuemastery(href="https://vuejs.amsterdam/?utm_source=newsletter&utm_medium=logo&utm_campaign=vuejs-newsletter")
      img(src="https://camo.githubusercontent.com/d70ce43e50f085dcaaba44706e75107b0f86ad6ab45d7cd75ec2d877db543d86/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3739333538333739373435343530333937362f3739333538333833313336393634363132302f7675656a73616d7374657264616d2e706e67" alt="Vue.js Amsterdam" width="320")

  h3.h3 Silver
  p.sponsors.logos
    a.logo-link.logo-vuemastery(href="https://www.storyblok.com/developers?utm_source=newsletter&utm_medium=logo&utm_campaign=vuejs-newsletter")
      img(src="https://a.storyblok.com/f/51376/3856x824/fea44d52a9/colored-full.png" alt="Storyblok" width="240px")

  h3.h3 Bronze
  p.sponsors.logos
    a.logo-link.logo-vuemastery(href="https://www.vuemastery.com/")
      img(src="https://cdn.discordapp.com/attachments/258614093362102272/557267759130607630/Vue-Mastery-Big.png" alt="Vue Mastery" width="180px")
    a.logo-link.logo-vuemastery(href="https://vuejobs.com/")
      img(src="https://cdn.discordapp.com/attachments/560524372897562636/636900598700179456/vuejobs-logo.png" alt="Vue Jobs" width="140px")
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

.h2
  margin: 40px 0 10px
  font-size: 1.6rem

.h3
  font-size: 1.4rem
  margin-bottom: 20px
  margin-top: 40px

.link
  color: $color-green
  margin-right: 3px

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
  margin: 15px


@media #{$mini-only}
  .logo-and
    display: block
    position: relative
    top: 0.6em
</style>

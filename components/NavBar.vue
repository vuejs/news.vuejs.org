<template lang="pug">
.nav-bar
  .nav-bar__outside
    .nav-bar__inner
      nuxt-link.nav-bar__home(to="/")
        img.nav-bar__logo(src="~assets/images/logo.png", alt="Vue.js logo")
        span.nav-bar__logo-text Vue.js News
      .nav
        ul
          li.nav-bar__subscribe-link
            nuxt-link(to="/subscribe") Subscribe
          li
            nuxt-link(to="/submit") Submit
          li
            nuxt-link(to="/search") Search
          li
            nuxt-link(to="/archive") Archives
          li
            nuxt-link(to="/about") About
</template>

<style lang="sass">
@import '../assets/branding'

.nav-bar
  display: block
  position: relative
  width: 100%
  height: 60px
  z-index: 2

.nav-bar__outside
  position: fixed
  width: 100%
  padding: 10px 0
  top: 0
  background: #fff
  height: 90px
  box-shadow: 0 0 1px rgba(#000, .25)

  @media #{$small-up}
    height: 60px

.nav-bar__inner
  max-width: 1200px
  margin: 0 auto
  position: relative
  padding: 0
  display: flex
  flex-direction: column

  @media #{$small-up}
    padding-left: 30px
    padding-right: 30px
    display: block

.nav-bar__home
  display: flex
  justify-content: center
  font-size: 1.5em
  line-height: 40px
  color: #2c3e50
  font-family: $secondary-font-stack
  font-weight: 500

  @media #{$small-up}
    display: inline

.nav-bar__logo
  vertical-align: middle
  margin-right: 6px
  width: 40px
  height: 40px

.nav-bar__logo-text
  display: none

  @media #{$small-up}
    display: inline-block

.nav
  list-style-type: none
  margin: 0
  padding: 0
  position: absolute
  width: 100%
  top: 40px
  height: 40px
  line-height: 40px
  display: flex
  justify-content: center
  align-items: center

  @media #{$small-up}
    right: 30px
    top: 0
    display: block
    width: unset

  ul
    padding: 0

    @media #{$small-up}
      padding-left: 40px

  li
    display: inline-block
    position: relative
    margin: 0 0 0 1em
    font-size: 0.9rem

    @media #{$small-up}
      font-size: 1rem

  li:first-of-type
    margin: 0

  .nav-bar__subscribe-link

    @media #{$medium-up}
      display: none
</style>

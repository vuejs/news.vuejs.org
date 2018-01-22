<template lang="pug">
.nav-bar
  .nav-bar__outside
    .nav-bar__inner
      nuxt-link.nav-bar__home(to="/")
        img.nav-bar__logo(src="~assets/images/logo.png")
        | Vue.js News
      .nav
        ul
          li
            nuxt-link(to="/archive") Archives
          li
            nuxt-link(to="/about") About
</template>

<style lang="sass">
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
  height: 60px
  box-shadow: 0 0 1px rgba(#000, .25)

.nav-bar__inner
  max-width: 1200px
  margin: 0 auto
  position: relative

.nav-bar__home
  display: inline-block
  font-size: 1.5em
  line-height: 40px
  color: #2c3e50
  font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif
  font-weight: 500
  margin-left: 30px

.nav-bar__logo
  vertical-align: middle
  margin-right: 6px
  width: 40px
  height: 40px

.nav
  list-style-type: none
  margin: 0
  padding: 0
  position: absolute
  right: 30px
  top: 0
  height: 40px
  line-height: 40px

  li
    display: inline-block
    position: relative
    margin: 0 0.6em
</style>

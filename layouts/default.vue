<template lang="pug">
div
  NavBar
  .container
    .issues-container
      nuxt
    .sidebar-container
      SideBar
</template>

<script>
import NavBar from '~/components/NavBar'
import SideBar from '~/components/SideBar'

export default {
  components: {
    NavBar,
    SideBar
  },
  head () {
    return {
      title: 'News — Vue.js'
    }
  }
}
</script>

<style lang="sass">
@import 'assets/branding'

html
  font:
    family: $primary-font-stack
    size: 15px
  background: #fff
  margin: 0
  color: $color-dark-blue
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box

*, *:before, *:after
  box-sizing: border-box
  margin: 0

.container
  padding: 60px 0
  max-width: 1200px
  margin: 0 auto
  display: flex

.issues-container,
.sidebar-container
  padding: 0 30px 50px

.issues-container
  width: 65%

.sidebar-container
  width: 35%

a
  text-decoration: none
  color: #34495e

.content a, .link
  font-weight: 600
  color: #42b983

.slide-transition
  transition: all .5s cubic-bezier(.55,0,.1,1)

.slide-left-enter,
.slide-right-leave-active
  opacity: 0
  transform: translate(50px, 0)

.slide-left-leave-active,
.slide-right-enter
  opacity: 0
  transform: translate(-50px, 0)
</style>

<template lang="pug">
div
  NavBar
  .container
    .content-container
      nuxt
    .sidebar-container
      SideBar
    SubscribePrompt
    PodcastPlayer
</template>

<script>
import NavBar from '~/components/NavBar'
import SideBar from '~/components/SideBar'
import PodcastPlayer from '~/components/PodcastPlayer'
import SubscribePrompt from '~/components/SubscribePrompt'

export default {
  components: {
    NavBar,
    SideBar,
    PodcastPlayer,
    SubscribePrompt
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

.content-container,
.sidebar-container
  padding: 0 18px 50px
  overflow: hidden

  @media #{$small-up}
    overflow: visible
    padding-left: 30px
    padding-right: 30px

.content-container
  width: 100%

  @media #{$medium-up}
    width: 65%

.sidebar-container
  width: 35%
  display: none

  @media #{$medium-up}
    display: block

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

.button
  background: $light-grey
  padding: 5px 20px
  line-height: 30px
  letter-spacing: 0.1em
  font:
    size: 13px
    weight: 600
  cursor: pointer
  text-transform: uppercase
  border-radius: 2em
  border: none

  &:hover
    opacity: 0.8

.hr
  margin: 30px 0 20px
  border: none
  border-top: 1px solid darken($light-grey, 10%)
</style>

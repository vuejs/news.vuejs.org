<template lang="pug">
transition(name="slide")
  .subscribe-prompt(v-if="isVisible")
    nuxt-link(
      to="/subscribe"
    )
      | Subscribe to the News
    button.subscribe-prompt-close(type="button", @click="close")
      | &times;
</template>

<script>
export default {
  data () {
    return {
      alreadySubscribed: false,
      recentlyClosed: false,
      initialDelayPassed: false
    }
  },
  computed: {
    isVisible () {
      return !this.alreadySubscribed &&
        !this.recentlyClosed &&
        this.$route.name !== 'subscribe' &&
        this.initialDelayPassed
    }
  },
  methods: {
    close () {
      this.recentlyClosed = true
      localStorage.setItem('recentlyClosed', Date.now())
    }
  },
  mounted () {
    const recentlyClosedTime = localStorage.getItem('recentlyClosed')
    if (localStorage.getItem('subscribed')) this.alreadySubscribed = true
    if (recentlyClosedTime) {
      this.recentlyClosed = (Date.now() - 3600000) < recentlyClosedTime
    }

    setTimeout(() => {
      this.initialDelayPassed = true
    }, 20000)
  }
}
</script>

<style lang="sass" scoped>
@import 'assets/branding'

.subscribe-prompt
  position: fixed
  bottom: 80px
  left: 0
  right: 0
  max-width: 250px
  margin: 0 auto
  padding: 5px 15px
  text-align: center
  border-radius: 20px
  background: #fff
  color: $color-green
  box-shadow: 0 2px 3px rgba(#000, .15)
  font-size: 18px
  font-weight: 600
  display: block

  @media #{$medium-up}
    display: none

.subscribe-prompt-close
  border: none
  background: none
  font-size: 24px
  font-weight: 600
  padding-left: 20px

  &:focus
    outline: none

.slide-enter-active, .slide-leave-active
  transition: transform .7s

.slide-enter, .slide-leave-to
  transform: translateY(200px)
</style>

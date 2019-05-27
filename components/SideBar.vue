<template lang="pug">
.sidebar
  .sidebar__box
    h1.h1 The Official Vue News
    p.p
      | We exist to provide Vue developers with the latest news and tutorials to stay up-to-date with their technology.
      //- |  If you’d like to get invlovled please visit our
      //- |
      //- a.link(href="") Discord channel

  SubscribeContent
</template>

<script>
import SubscribeContent from '@/components/SubscribeContent'

export default {
  components: { SubscribeContent }
}
</script>

<style lang="sass">
@import '~assets/branding'

.sidebar__box
  background: #f9f9f9
  padding: 30px
  border-radius: 5px

.sidebar-header
  font-size: 20px
  font-weight: 600
  margin: 30px 0 10px

.h1
  margin-bottom: 10px

.p
  font-size: 18px
</style>

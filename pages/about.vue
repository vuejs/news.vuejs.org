<template lang="pug">
.slide-transition
  h1.h1 About
</template>

<script>
export default {
  transition (to, from) {
    if (!from) return 'slide-right'
    return +to.query.page < +from.query.page ? 'slide-left' : 'slide-right'
  }
}
</script>

<style lang="sass">
</style>

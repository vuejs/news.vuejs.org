<template lang="pug">
.spinner
</template>

<style lang="sass">
@import '~assets/branding'

$spinner-size: 50px

.spinner
  width: $spinner-size

  &:before,
  &:after
    position: absolute
    content: ''
    top: 50%
    left: 50%
    margin: $spinner-size / -2 0 0 $spinner-size / -2
    width: $spinner-size
    height: $spinner-size
    border-radius: 100%
    border-color: $color-green transparent transparent
    border-style: solid
    border-width: 4px
    box-shadow: 0 0 0 1px transparent

  &:before
    animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62)
    animation-iteration-count: infinite

  &:after
    animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8)
    animation-iteration-count: infinite

@keyframes spinning
  from
    transform: rotate(0)
  to
    transform: rotate(2turn)
</style>

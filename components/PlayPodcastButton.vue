<template lang="pug">
button.button.play-podcast-button
  svg(
    aria-labelledby="simpleicons-play-icon"
    role="img"
    viewBox="0 0 100 100"
    fill="#FFFFFF"
  )
    title(id="simpleicons-play-icon" lang="en") Play icon
    path(
      d="M50,3.8C24.5,3.8,3.8,24.5,3.8,50S24.5,96.2,50,96.2S96.2,75.5,96.2,50S75.5,3.8,50,3.8z M71.2,53.3l-30.8,18  c-0.6,0.4-1.3,0.5-1.9,0.5c-0.6,0-1.3-0.1-1.9-0.5c-1.2-0.6-1.9-1.9-1.9-3.3V32c0-1.4,0.8-2.7,1.9-3.3c1.2-0.6,2.7-0.6,3.8,0  l30.8,18c1.2,0.6,1.9,1.9,1.9,3.3S72.3,52.7,71.2,53.3z"
    )
  | Play the podcast
</template>

<style lang="sass">
@import 'assets/branding'

.play-podcast-button
  background-color: $color-green
  color: #fff
  padding: 5px 20px 5px 5px
  margin: 20px 30px 0 0

  img, svg
    width: 30px
    height: 30px
    vertical-align: top
    margin-right: 10px
    line-height: 30px
    display: inline-block

  span
    display: inline-block
    line-height: 30px
    vertical-align: middle
</style>

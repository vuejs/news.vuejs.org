import Vue from 'vue'

export function bounce (progress) {
  for (var a = 0, b = 1; 1; a += b, b /= 2) {
    if (progress >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2)
    }
  }
}

export function circ (progress) {
  return 1 - Math.sin(Math.acos(progress))
}

export function linear (progress) {
  return progress
}

export function back (x) {
  return progress => Math.pow(progress, 2) * ((x + 1) * progress - x)
}

export function makeEaseInOut (delta) {
  return function (progress) {
    if (progress < 0.5) {
      return delta(2 * progress) / 2
    } else {
      return (2 - delta(2 * (1 - progress))) / 2
    }
  }
}

export function makeEaseOut (delta) {
  return function (progress) {
    return 1 - delta(1 - progress)
  }
}

export const bounceEaseOut = makeEaseOut(bounce)
export const backEaseOut = pushBack => makeEaseOut(back(pushBack))
export const circEaseInOut = makeEaseInOut(circ)
export const circEaseOut = makeEaseOut(circ)

export function combineSteps (...steps) {
  return function (progress) {
    steps.forEach(step => step(progress))
  }
}

function * toGenerator (iterable) {
  yield * iterable
}

export function createAnimation (obj, prop, from, to, userConfig) {
  return () => animation(obj, prop, from, to, userConfig)
}

function adjustValue (from, to, abs, progress) {
  return to > from
    ? from + (abs * progress)
    : from - (abs * progress)
}

function createStep (obj, property, to) {
  let from = Object.assign({}, obj[property])

  function newStateBuilder () {
    if (typeof to === 'object') {
      const params = Object.keys(to).map(key => {
        return {
          key,
          from: from[key],
          to: to[key],
          abs: Math.abs(to[key] - from[key])
        }
      })
      return progress => {
        const newState = params.reduce((o, param) => {
          o[param.key] = adjustValue(param.from, param.to, param.abs, progress)
          return o
        }, {})
        return {
          ...from,
          ...newState
        }
      }
    } else {
      const abs = Math.abs(to - from)
      return progress => adjustValue(from, to, abs, progress)
    }
  }

  const getNewState = newStateBuilder()

  return progress => {
    Vue.set(obj, property, getNewState(progress))
  }
}

const defaultConfig = {
  duration: 300,
  easing: progress => progress,
  repeat: 0,
  alternate: true,
  infinite: false
}

export function animation (obj, prop, to, userConfig) {
  return () => {
    const step = createStep(obj, prop, to)
    let iterations = [step]
    const config = {
      ...defaultConfig,
      ...userConfig
    }

    if (config.repeat > 0) {
      let repetitions = Array(config.repeat).fill(step)

      if (config.alternate) {
        const altStep = createStep(obj, prop, to)
        repetitions = repetitions.map((r, i) => i % 2 ? r : altStep)
      }
      iterations = iterations.concat(repetitions)
    }

    const animations = toGenerator(iterations)

    const startAnimations = resolve => {
      const run = ({ value: currentStep, done }) => {
        if (done) return resolve()

        const startTime = performance.now()

        const animationStep = function (currentTime) {
          let progress = (currentTime - startTime) / config.duration

          if (progress > 1) progress = 1

          currentStep(config.easing(progress))
          if (progress !== 1) {
            window.requestAnimationFrame(animationStep)
          } else {
            run(animations.next())
          }
        }
        window.requestAnimationFrame(animationStep)
      }
      run(animations.next())
    }

    return new Promise(startAnimations)
  }
}

export function wait (duration) {
  return () => new Promise(resolve => setTimeout(() => resolve(), duration))
}

export function stagger (animations, delay) {
  return () => {
    const animationsGenerator = toGenerator(animations)
    const startSequence = resolve => {
      async function animateNext ({ value: animation, done }) {
        if (done) return resolve()
        animation()
        await wait(delay)()
        animateNext(animationsGenerator.next())
      }
      animateNext(animationsGenerator.next())
    }

    return new Promise(startSequence)
  }
}

export function sequence (animations) {
  return () => {
    const animationsGenerator = toGenerator(animations)
    const startSequence = resolve => {
      async function animateNext ({ value: animation, done }) {
        if (done) return resolve()
        await animation()
        animateNext(animationsGenerator.next())
      }
      animateNext(animationsGenerator.next())
    }

    return new Promise(startSequence)
  }
}

export function repeat (times, sequence) {
  return () => {
    const repeatAnimations = resolve => {
      async function run (i) {
        if (i === times) return resolve()
        await sequence()
        run(i + 1)
      }
      run(0)
    }

    return new Promise(repeatAnimations)
  }
}

export function breakpoint () {
  let _resolve = () => { console.log('Nothing to resume yet') }
  let _reject = () => { console.log('Nothing to stop yet') }
  const blocker = () => new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })
  blocker.resume = () => _resolve()
  blocker.stop = () => _reject()
  return blocker
}

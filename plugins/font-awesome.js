import fontawesome from '@fortawesome/fontawesome'
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay'
import faPause from '@fortawesome/fontawesome-free-solid/faPause'
import faFastForward from '@fortawesome/fontawesome-free-solid/faFastForward'
import faFastBackward from '@fortawesome/fontawesome-free-solid/faFastBackward'

fontawesome.config = {
  autoAddCss: false
}

fontawesome.library.add(faPlay, faPause, faFastForward, faFastBackward)

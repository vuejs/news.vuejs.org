import fontawesome from '@fortawesome/fontawesome'
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay'
import faPause from '@fortawesome/fontawesome-free-solid/faPause'
import faForward from '@fortawesome/fontawesome-free-solid/faForward'
import faBackward from '@fortawesome/fontawesome-free-solid/faBackward'

fontawesome.config = {
  autoAddCss: false
}

fontawesome.library.add(faPlay, faPause, faForward, faBackward)

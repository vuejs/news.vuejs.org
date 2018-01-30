import fontawesome from '@fortawesome/fontawesome'
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay'
import faPause from '@fortawesome/fontawesome-free-solid/faPause'
import faStepForward from '@fortawesome/fontawesome-free-solid/faStepForward'
import faStepBackward from '@fortawesome/fontawesome-free-solid/faStepBackward'

fontawesome.config = {
  autoAddCss: false
}

fontawesome.library.add(faPlay, faPause, faStepForward, faStepBackward)

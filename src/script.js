import './style.css'

import createConfig from './system/config'
import createMultipleOverlay from './compositions/overlay-multiple'
import createSingleOverlay from './compositions/overlay-single'
import createGrainyBox from './compositions/grainy-box'
import createInstanced from './compositions/instanced'
import createMatrix from './compositions/matrix'

const form = document.querySelector('form.select-form')
form.addEventListener('submit', (event) => {
  event.preventDefault()
  const { value: composition } = form.compositions
  const config = createConfig()

  switch (composition) {
    case 'overlay-multiple':
      createMultipleOverlay(config)
      break
    case 'overlay-single':
      createSingleOverlay(config)
      break
    case 'grainy-box':
      createGrainyBox(config)
      break
    case 'matrix':
      createMatrix(config)
      break
    case 'instanced':
      createInstanced(config)
  }

  // remove form
  var child = form.lastElementChild
  while (child) {
    form.removeChild(child)
    child = form.lastElementChild
  }
})

/**
 * Base
 */
// Debug

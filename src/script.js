import './style.css'
import * as THREE from 'three'
import createBgSphere from './components/background/createBgSphere'
import createBox from './components/box/createBox'
import createConfig from './system/config'
import createLights from './components/lights/createLights'
import createTeapot from './components/teapot/createTeapot'
import { createScreenShot } from './utils'
import createMultipleOverlay from './compositions/overlay-multiple'
import createSingleOverlay from './compositions/overlay-single'
import createGrainyBox from './compositions/grainy-box'

const form = document.querySelector('form.select-form')
form.addEventListener('submit', (event) => {
  event.preventDefault()
  const { value: composition } = form.compositions
  const config = createConfig()
  if (composition === 'overlay-multiple') {
    createMultipleOverlay(config)
  }
  if (composition === 'overlay-single') {
    createSingleOverlay(config)
  }
  if (composition === 'grainy-box') {
    createGrainyBox(config)
  }

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

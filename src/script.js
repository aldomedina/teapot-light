import './style.css'
import * as THREE from 'three'
import createBgSphere from './components/background/createBgSphere'
import createBox from './components/box/createBox'
import config from './system/config'
import createLights from './components/lights/createLights'
import createTeapot from './components/teapot/createTeapot'
import { createScreenShot } from './utils'

/**
 * Base
 */
// Debug
const {
  modifier,
  palette,
  teapot_config,
  lights_config,
  camera_config,
  withBox,
  shadows,
} = config()

const canvas = document.querySelector('canvas.webgl')
const teapotDOM = document.querySelector('div.teapots')
const sizes = {
  width: window.innerHeight,
  height: window.innerHeight,
}

let shadowModifier = 0
for (let i = 0; i < shadows.q; i++) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000
  )
  camera.position.z = camera_config.z

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.physicallyCorrectLights = true
  renderer.shadowMap.enabled = true
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.gammaOutput = true
  renderer.gammaFactor = 2.2

  const teapot = createTeapot(teapot_config, palette, shadows, shadowModifier)
  shadowModifier += shadows.modifier
  const bgSphere = createBgSphere(palette)
  const spotlight = createLights(lights_config)
  spotlight.target = teapot
  camera.lookAt(teapot.position)

  scene.add(camera, teapot, bgSphere, spotlight)

  if (withBox) {
    const box = createBox(palette, modifier)
    box.translateZ(teapot_config.depth)
    scene.add(box)
  }

  renderer.render(scene, camera)

  const url = createScreenShot(renderer, scene, camera)
  const domIMG = document.createElement('div')
  domIMG.classList.add('img')
  domIMG.classList.add(`img-${i + 1}`)
  domIMG.style.backgroundImage = `url(${url})`
  domIMG.style.mixBlendMode = shadows.blendsModes[i]
  teapotDOM.appendChild(domIMG)
}

// window.addEventListener('resize', () => {
//   // Update sizes
//   sizes.width = window.innerHeight
//   sizes.height = window.innerHeight

//   // Update camera
//   camera.aspect = sizes.width / sizes.height
//   camera.updateProjectionMatrix()

//   // Update renderer
//   renderer.setSize(sizes.width, sizes.height)
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

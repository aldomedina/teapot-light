import * as THREE from 'three'
import createBgSphere from '../../components/background/createBgSphere'
import createBox from '../../components/box/createBox'
import createLights from '../../components/lights/createLights'
import createTeapot from '../../components/teapot/createTeapot'

import createRender from '../../system/createRender'

export default function createGrainyBox(config) {
  const {
    modifier,
    palette,
    teapot_config,
    lights_config,
    camera_config,
    shadows,
    settings,
  } = config
  const canvas = document.querySelector('canvas.webgl')
  const teapotDOM = document.querySelector('div.teapots')

  const sideSize = Math.min(window.innerHeight, window.innerWidth)
  teapotDOM.style.height = `${sideSize}px`
  teapotDOM.style.width = `${sideSize}px`

  document.styleSheets[0].insertRule(
    `
  canvas {
    position: relative;
    display: block;
    margin: 0 auto;
  }
  `,
    0
  )

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, sideSize / sideSize, 0.1, 1000)
  // TODO: check sizing
  camera.position.z = camera_config.z + 8

  const renderer = createRender(canvas, sideSize)
  const teapot = createTeapot(
    teapot_config,
    { ...palette, teapot: palette.teapot },
    shadows,
    0,
    'grainy-box',
    settings
  )
  const bgSphere = createBgSphere(palette)
  const spotlight = createLights(lights_config, 'grainy-box')
  const box = createBox(palette, modifier, 'grainy-box', {
    speed: 0,
    density: 0,
    strenght: 0,
    frequency: 0,
    amplitude: 0,
    intensity: 0,
  })
  teapot.position.z = 10
  spotlight.target = teapot
  camera.lookAt(teapot.position)

  scene.add(camera, teapot, bgSphere, spotlight, box)

  renderer.render(scene, camera)
  window.addEventListener('resize', () => {
    const sideSize = Math.min(window.innerHeight, window.innerWidth)
    teapotDOM.style.height = `${sideSize}px`
    teapotDOM.style.width = `${sideSize}px`
  })
}

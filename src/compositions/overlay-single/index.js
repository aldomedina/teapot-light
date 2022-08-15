import * as THREE from 'three'
import createBgSphere from '../../components/background/createBgSphere'
import createBox from '../../components/box/createBox'
import createLights from '../../components/lights/createLights'
import createTeapot from '../../components/teapot/createTeapot'
import createRender from '../../system/createRender'
import { createScreenShot } from '../../utils'

export default function createSingleOverlay(config) {
  const {
    modifier,
    palette,
    teapot_config,
    lights_config,
    camera_config,
    shadows,
  } = config
  const canvas = document.querySelector('canvas.webgl')
  const teapotDOM = document.querySelector('div.teapots')

  const sideSize = Math.min(window.innerHeight, window.innerWidth)
  teapotDOM.style.height = `${sideSize}px`
  teapotDOM.style.width = `${sideSize}px`

  document.styleSheets[0].insertRule(
    `
  .teapots {
    position: relative;
    display: block;
    margin: 0 auto;
  }
  `,
    0
  )
  document.styleSheets[0].insertRule(
    `
  .img {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  `,
    0
  )

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, sideSize / sideSize, 0.1, 1000)
  camera.position.z = camera_config.z

  /**
   * Renderer
   */
  const renderer = createRender(canvas, sideSize)

  const teapot = createTeapot(teapot_config, palette, shadows)
  const bgSphere = createBgSphere(palette)
  const spotlight = createLights(lights_config)
  spotlight.target = teapot
  camera.lookAt(teapot.position)

  scene.add(camera, teapot, bgSphere, spotlight)

  const box = createBox(palette, modifier)
  box.translateZ(teapot_config.depth)
  scene.add(box)

  renderer.render(scene, camera)

  const url = createScreenShot(renderer, scene, camera)
  const domIMG = document.createElement('div')
  domIMG.classList.add('img')
  domIMG.classList.add(`img-1`)
  domIMG.style.backgroundImage = `url(${url})`
  domIMG.style.mixBlendMode = shadows.blendsModes[0]
  teapotDOM.appendChild(domIMG)

  canvas.remove()

  window.addEventListener('resize', () => {
    const sideSize = Math.min(window.innerHeight, window.innerWidth)
    teapotDOM.style.height = `${sideSize}px`
    teapotDOM.style.width = `${sideSize}px`
  })
}

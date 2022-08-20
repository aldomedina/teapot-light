import * as THREE from 'three'
import createBgSphere from '../../components/background/createBgSphere'
import createBox from '../../components/box/createBox'
import createLights from '../../components/lights/createLights'
import createTeapot from '../../components/teapot/createTeapot'
import createRender from '../../system/createRender'
import { createScreenShot } from '../../utils'

export default function createMatrix(config) {
  const {
    modifier,
    palette,
    teapot_config,
    lights_config,
    camera_config,
    shadows,
    matrix: { matrixside, matrixModifiers, boxMaterial },
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
    position: absolute;    
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  `,
    0
  )

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, sideSize / sideSize, 0.1, 1000)
  camera.position.z = 8.5

  /**
   * Renderer
   */
  const renderer = createRender(canvas, sideSize)
  const teapot = createTeapot(teapot_config, palette, 0, 0, 'matrix')
  teapot.position.z = 4
  const bgSphere = createBgSphere(palette)
  const spotlight = createLights(lights_config)
  spotlight.target = teapot
  camera.lookAt(teapot.position)

  scene.add(camera, teapot, bgSphere, spotlight)

  const box = createBox(palette, { ...modifier, bgPlano: false }, boxMaterial)
  box.translateZ(teapot_config.depth)
  scene.add(box)

  renderer.render(scene, camera)

  const url = createScreenShot(renderer, scene, camera)
  const matrixSideSize = 100 / matrixside

  for (let x = 0; x < matrixside; x++) {
    for (let y = 0; y < matrixside; y++) {
      const i = x + y
      const domIMG = document.createElement('div')
      domIMG.classList.add('img')
      domIMG.style.backgroundImage = `url(${url})`
      domIMG.style.top = `${matrixSideSize * x}%`
      domIMG.style.left = `${matrixSideSize * y}%`
      domIMG.style.height = `${matrixSideSize}%`
      domIMG.style.width = `${matrixSideSize}%`
      domIMG.style.mixBlendMode = 'overlay'
      domIMG.style.transform = matrixModifiers[i]

      teapotDOM.appendChild(domIMG)
    }
  }

  canvas.remove()

  window.addEventListener('resize', () => {
    const sideSize = Math.min(window.innerHeight, window.innerWidth)
    teapotDOM.style.height = `${sideSize}px`
    teapotDOM.style.width = `${sideSize}px`
  })
}

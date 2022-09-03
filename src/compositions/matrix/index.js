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
    matrix: {
      matrixside,
      matrixModifiers,
      boxMaterial,
      rowModifiers,
      cellOpacity,
    },
    settings,
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
    overflow: hidden;
  }
  `,
    0
  )

  document.styleSheets[0].insertRule(
    `
  .teapotsRow {
    display: flex;
    height: ${100 / matrixside}%;   
    transform-origin: bottom left;
  }
  `,
    0
  )

  document.styleSheets[0].insertRule(
    `
  .img {        
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    flex:1;
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
  const teapot = createTeapot(teapot_config, palette, 0, 0, 'matrix', settings)
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
  const bgcol = palette.teapot.toString(16)
  console.log(bgcol)
  document.body.style.backgroundColor = `#${bgcol}`
  for (let x = 0; x < matrixside; x++) {
    const rowDiv = document.createElement('div')
    rowDiv.classList.add('teapotsRow')
    rowDiv.style.transform = rowModifiers[x]
    for (let y = 0; y < matrixside; y++) {
      const i = x + y
      const domIMG = document.createElement('div')
      domIMG.classList.add('img')
      domIMG.style.backgroundImage = `url(${url})`

      domIMG.style.mixBlendMode = 'overlay'
      domIMG.style.transform = matrixModifiers[i]
      domIMG.style.opacity = 1 - cellOpacity[i]

      rowDiv.appendChild(domIMG)
    }
    teapotDOM.appendChild(rowDiv)
  }

  canvas.remove()

  window.addEventListener('resize', () => {
    const sideSize = Math.min(window.innerHeight, window.innerWidth)
    teapotDOM.style.height = `${sideSize}px`
    teapotDOM.style.width = `${sideSize}px`
  })
}

import * as THREE from 'three'
import createBgSphere from '../../components/background/createBgSphere'
import createBox from '../../components/box/createBox'
import createLights from '../../components/lights/createLights'
import createInstancedTeapot from '../../components/teapot/createInstancedTeapot'
import { createScreenShot } from '../../utils'
import createRender from '../../system/createRender'

export default function createInstanced(config) {
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

  let shadowModifier = 0
  let shadowSecondaryModifier = 0
  for (let i = 0; i < 1; i++) {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      sideSize / sideSize,
      0.1,
      1000
    )
    // TODO: check sizing
    camera.position.z = camera_config.z + 8

    const renderer = createRender(canvas, sideSize)

    const bgSphere = createBgSphere(palette)
    const spotlight = createLights(lights_config, 'grainy-box')
    const teapots = createInstancedTeapot(teapot_config, palette)
    // const box = createBox(palette, modifier)
    shadowModifier += shadows.modifier
    shadowSecondaryModifier += shadows.secondaryModifier
    scene.add(camera, teapots, bgSphere, spotlight)
    renderer.render(scene, camera)

    const url = createScreenShot(renderer, scene, camera)
    const domIMG = document.createElement('div')
    domIMG.classList.add('img')
    domIMG.classList.add(`img-${i + 1}`)
    domIMG.style.backgroundImage = `url(${url})`
    domIMG.style.mixBlendMode = 'screen'

    teapotDOM.appendChild(domIMG)
  }

  canvas.remove()

  window.addEventListener('resize', () => {
    const sideSize = Math.min(window.innerHeight, window.innerWidth)
    teapotDOM.style.height = `${sideSize}px`
    teapotDOM.style.width = `${sideSize}px`
  })
}

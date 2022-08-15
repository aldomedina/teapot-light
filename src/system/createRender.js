import * as THREE from 'three'
export default function createRender(canvas, sideSize) {
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  })
  renderer.setSize(sideSize, sideSize)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.physicallyCorrectLights = true
  renderer.shadowMap.enabled = true
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.gammaOutput = true
  renderer.gammaFactor = 2.2

  return renderer
}

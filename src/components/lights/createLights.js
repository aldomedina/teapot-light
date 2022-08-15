import { AmbientLight, SpotLight, Group } from 'three'

export default function createLights(config, compo) {
  const {
    position: { x, y, z },
    intensity,
  } = config

  console.log(config)
  const mainLight = new SpotLight(
    0xffffff,
    compo === 'grainy-box' ? 10 : intensity
  )
  mainLight.castShadow = true
  mainLight.shadowCameraVisible = true
  mainLight.shadow.mapSize.width = 1024
  mainLight.shadow.mapSize.height = 1024

  mainLight.shadow.camera.fov = 220

  mainLight.position.set(x, y, z)
  return mainLight
}

// {
//   "position": {
//       "x": 0,
//       "y": 10,
//       "z": 15
//   },
//   "intensity": 10
// }

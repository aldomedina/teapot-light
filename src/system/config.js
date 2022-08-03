import { Random } from '../Random'
import blendingModes from './blendingModes'
import palettes from './palettes'

export default function config() {
  const R = new Random()
  const { darkModes, lightModes, neutralModes, changeModes } = blendingModes
  const palette = R.random_choice(palettes)
  const singleTeapot = R.random_bool(0.01)
  const shadows = singleTeapot ? 1 : R.random_int(2, 6) * 2
  const teapotSize = R.random_num(3.5, 4)
  const withDifference = R.random_bool(0.5)
  const bgPlano = R.random_bool(0.2)
  const planoPositions = ['tr', 'tl', 'br', 'bl', 'ctr']
  const blendsModes = []

  let axis = ['x', 'y', 'z']
  const axis1 = R.random_choice(axis)
  axis = axis.filter((el) => el !== axis1)
  const axis2 = R.random_choice(axis)

  const maxX = 70
  const maxZ = 40
  const initX = R.random_num(-40, 20)
  const initZ = R.random_num(-60, 20)

  const rotationModifierX = R.random_num(1, (maxX - initX) / shadows)
  const rotationModifierZ = R.random_num(1, (maxZ - initZ) / shadows)

  for (let i = 0; i < shadows; i++) {
    if (withDifference) {
      if (i % 3 == 0) {
        blendsModes.push(R.random_choice(neutralModes))
      } else if (i % 2 == 0) {
        blendsModes.push(R.random_choice(darkModes))
      } else {
        blendsModes.push(R.random_choice(lightModes))
      }
    } else {
      if (i % 2 == 0) {
        blendsModes.push(R.random_choice(darkModes))
      } else {
        blendsModes.push(R.random_choice(lightModes))
      }
    }
  }

  const config = {
    palette: {
      bg: palette[0],
      col1: palette[1],
      col2: palette[2],
      col3: palette[3],
      col4: palette[4],
      teapot: palette[5],
      teapot_shadow: palette[6],
    },
    modifier: {
      bgPlano,
      magnitude: R.random_num(-2, 2),
      left: R.random_bool(0.5),
      right: R.random_bool(0.5),
      top: R.random_bool(0.5),
      bottom: R.random_bool(0.5),
      x: R.random_bool(0.5),
      y: R.random_bool(0.5),
      planoPosition: R.random_choice(planoPositions),
    },
    teapot_config: {
      rotation: {
        x: initX,
        y: R.random_int(0, 360),
        z: initZ,
      },
      size: teapotSize,
      depth: -8,
    },
    lights_config: {
      position: {
        x: R.random_int(-10, -10),
        y: 10,
        z: 15,
      },
      intensity: 10,
    },
    camera_config: {
      x: 0,
      y: 0,
      z: 9.6,
    },
    shadows: {
      q: shadows,
      modifier: R.random_int(9, shadows * 10),
      mainRotationAxis: axis1,
      secondaryRotationAxis: axis2,
      rotationModifierX,
      y: R.random_int(0, 360),
      rotationModifierZ,
      blendsModes,
    },
  }
  console.log(config)
  return config
}

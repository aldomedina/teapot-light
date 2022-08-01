import { Random } from '../Random'
import blendingModes from './blendingModes'
import palettes from './palettes'

export default function config() {
  const R = new Random()
  const { darkModes, lightModes, neutralModes, changeModes } = blendingModes
  const palette = R.random_choice(palettes)
  console.log(palette)
  const shadows = R.random_int(2, 6) * 2
  const teapotSize = R.random_num(3.5, 4)
  const withDifference = R.random_bool(0.5)
  const blendsModes = []
  const modifierX = R.random_bool(0.5)
  const modifierY = R.random_bool(0.5)
  const modifierZ = !modifierX && !modifierY ? true : R.random_bool(0.5)

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
      teapot: palette[1],
      teapot_shadow: palette[2],
      col1: palette[3],
      col2: palette[4],
      col3: palette[5],
      col4: palette[6],
    },
    modifier: {
      magnitude: 10,
      left: R.random_bool(0.5),
      right: R.random_bool(0.5),
      top: R.random_bool(0.5),
      bottom: R.random_bool(0.5),
    },
    teapot_config: {
      rotation: {
        x: R.random_int(0, 360),
        y: R.random_int(0, 360),
        z: R.random_int(0, 360),
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
      z: 9,
    },
    shadows: {
      q: shadows,
      modifier: R.random_int(9, shadows * 10),
      x: modifierX,
      y: modifierY,
      z: modifierZ,
      blendsModes,
    },
  }
  console.log(config)
  return config
}

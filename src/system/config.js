import { Random } from '../Random'
import blendingModes from './blendingModes'
import palettes from './palettes'

export default function config(settings) {
  const R = new Random()
  const { darkModes, lightModes, neutralModes, changeModes } = blendingModes
  const palette = R.random_choice(palettes)

  // createCSV(palettes.map((colors) => colors.map((color) => color.toString(16))))
  const shadows = R.random_int(2, 6)
  const teapotSize = R.random_num(3.5, 4)
  const withDifference = R.random_bool(0.5)
  const bgPlano = R.random_bool(0.8)
  const planoPositions = ['tr', 'tl', 'br', 'bl', 'ctr']
  const blendsModes = []

  let axis = ['x', 'y', 'z']
  const axis1 = R.random_choice(axis)
  axis = axis.filter((el) => el !== axis1)

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

  const leftBox = R.random_bool(0.5)
  const rightBox = leftBox ? false : true
  const topBox = R.random_bool(0.5)
  const bottomBox = topBox ? false : true

  const matrixside = R.random_choice([2, 3])
  let matrixModifiers = new Array(matrixside)
  let rowModifiers = new Array(matrixside)
  let cellOpacity = new Array(Math.pow(matrixside, 2))
  for (let x = 0; x < matrixside; x++) {
    const withTranslation = R.random_bool(0.5)
    rowModifiers[x] = `rotate(${R.random_num(-1, 1)}deg)`
    for (let y = 0; y < matrixside; y++) {
      const i = x + y
      const tx = withTranslation ? R.random_num(-8, -4) : R.random_num(4, 8)
      matrixModifiers[i] = `translateX(${tx}%)`
      cellOpacity[i] = R.random_num(0.2, 0.45) * x
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
      magnitude: R.random_num(-6.35, 6.35),
      left: leftBox,
      right: rightBox,
      top: topBox,
      bottom: bottomBox,
      bgPlano,
      planoPosition: R.random_choice(planoPositions),
      x: R.random_bool(0.5),
      y: R.random_bool(0.5),
    },
    teapot_config: {
      rotation: {
        x: R.random_num(10, 30),
        y: R.random_num(-180, -10),
        z: R.random_num(-10, 20),
      },
      size: teapotSize,
      depth: -8,
    },
    lights_config: {
      position: {
        x: R.random_int(-2, 2),
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
      modifier: R.random_choice([R.random_int(-35, -15), R.random_int(15, 35)]),
      mainRotationAxis: 'y',
      secondaryRotationAxis: R.random_choice(['x', 'z']),
      blendsModes,
    },
    matrix: {
      matrixside,
      matrixModifiers,
      rowModifiers,
      cellOpacity,
      boxMaterial: 'matrix',
    },
    settings,
  }
  console.log('config', config)
  return config
}

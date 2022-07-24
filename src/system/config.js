import { Random } from '../Random'

const modes = [
  'multiply',
  'darken',
  'lighten',
  'luminosity',
  'saturation',
  'overlay',
  'screen',
]

const palettes = [
  [0xf7def5, 0x1f9de3, 0x4719e3, 0xdc3eed, 0xb140f7, 0x5040f7, 0x5040f7],
  [0xc7c7ac, 0xf69b9a, 0xfe1b30, 0xef4665, 0xf69b9a, 0xfbcead, 0xfbcead],
  [0xdcdcdb, 0xff1aab, 0x16cabe, 0xd2131a, 0xff1aab, 0xebd234, 0xebd234],
  [0xdcdcdb, 0xff682c, 0x807a73, 0xff682c, 0xc1b9b2, 0xebd234, 0xebd234],
]

export default function config() {
  const R = new Random()
  const palette = R.random_choice(palettes)
  const shadows = R.random_int(3, 9)
  const teapotSize = R.random_int(2, 3)
  const blendsModes = []
  for (let i = 0; i < shadows; i++) {
    blendsModes.push(R.random_choice(modes))
  }
  const config = {
    withBox: R.random_bool(0.75),
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
      z: 10,
    },
    shadows: {
      q: shadows,
      modifier: R.random_int(10, shadows * 25),
      x: R.random_bool(0.5),
      y: R.random_bool(0.5),
      z: R.random_bool(0.5),
      blendsModes,
    },
  }
  console.log(config)
  return config
}

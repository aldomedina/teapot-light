import { Group, Mesh, MeshBasicMaterial, PlaneBufferGeometry } from 'three'
import createBoxGeometry from './createBoxGeometry'
import createGradientMaterial from '../materials/createGradientMaterial'
import createBgPlano from './createBgPlano'
import createLambertFilmGrainMaterial from '../materials/createLambertFilmGrainMaterial'

export default function createBox(
  palette,
  modifier,
  compo = 'gradient',
  settings
) {
  const { bgPlano, planoPosition, x, y } = modifier
  if (bgPlano && compo === 'gradient') {
    return createBgPlano(palette, planoPosition)
  }
  const geometry = createBoxGeometry(modifier)
  const material =
    compo === 'grainy-box'
      ? createLambertFilmGrainMaterial(
          { teapot: palette.teapot },
          true,
          settings
        )
      : createGradientMaterial(palette)
  const box = new Mesh(geometry, material)
  return box
}

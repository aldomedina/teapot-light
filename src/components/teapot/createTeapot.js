import {
  Group,
  Mesh,
  MeshBasicMaterial,
  MathUtils,
  Color,
  MeshStandardMaterial,
} from 'three'
import createBasicFilmGrainMaterial from '../materials/createBasicFilmGrainMaterial'
import createLambertFilmGrainMaterial from '../materials/createLambertFilmGrainMaterial'
import createTeapotGeometry from './createTeapotGeometry'

export default function createTeapot(
  config,
  palette,
  shadows,
  modifier = 0,
  compo,
  settings
) {
  const {
    size,
    rotation: { x, y, z },
  } = config

  const { mainRotationAxis, secondaryRotationAxis } = shadows
  const teapotSize = compo === 'grainy-box' ? 2 : compo === 'matrix' ? 2 : size
  const geometry = createTeapotGeometry(settings.segments)
  const material = createLambertFilmGrainMaterial(palette, true, settings)
  const outsideTeapot = new Mesh(geometry, material)
  outsideTeapot.castShadow = true
  outsideTeapot.receiveShadow = true

  const insideGeometry = geometry.clone()

  const insideMaterial = createBasicFilmGrainMaterial(palette, compo, settings)

  // const insideMaterial = new MeshStandardMaterial({
  //   color: compo === 'grainy-box' ? palette.bg : palette.teapot_shadow,
  //   roughness: 0.4,
  //   metalness: 0.5,
  // })

  insideGeometry.scale(0.999, 0.999, 0.999)
  const insideTeapot = new Mesh(insideGeometry, insideMaterial)
  insideTeapot.name = 'inside'
  outsideTeapot.name = 'outside'
  const teapot1 = new Group()
  teapot1.add(outsideTeapot, insideTeapot)

  const teapots = new Group()
  teapots.add(teapot1)

  teapots.rotateX(MathUtils.degToRad(x))
  teapots.rotateY(MathUtils.degToRad(y))
  teapots.rotateZ(MathUtils.degToRad(z))

  teapots.scale.x = teapotSize
  teapots.scale.y = teapotSize
  teapots.scale.z = teapotSize

  if (mainRotationAxis === 'x') teapots.rotateX(MathUtils.degToRad(modifier))
  if (mainRotationAxis === 'y') teapots.rotateY(MathUtils.degToRad(modifier))
  if (mainRotationAxis === 'z') teapots.rotateZ(MathUtils.degToRad(modifier))

  if (secondaryRotationAxis === 'x')
    teapots.rotateX(MathUtils.degToRad(modifier / 2))
  if (secondaryRotationAxis === 'y')
    teapots.rotateY(MathUtils.degToRad(modifier / 2))
  if (secondaryRotationAxis === 'z')
    teapots.rotateZ(MathUtils.degToRad(modifier / 2))

  return teapots
}

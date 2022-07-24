import { Group, Mesh, MeshBasicMaterial, MathUtils, Color } from 'three'
import createLambertFilmGrainMaterial from '../materials/createLambertFilmGrainMaterial'
import createTeapotGeometry from './createTeapotGeometry'

export default function createTeapot(config, palette, shadows, modifier) {
  const {
    size,
    rotation: { x, y, z },
  } = config

  const { x: sx, y: sy, z: sz } = shadows

  const geometry = createTeapotGeometry(size)
  const material = createLambertFilmGrainMaterial(palette, true)
  const outsideTeapot = new Mesh(geometry, material)
  outsideTeapot.castShadow = true
  outsideTeapot.receiveShadow = true

  const insideGeometry = geometry.clone()
  const insideMaterial = new MeshBasicMaterial({
    color: palette.teapot_shadow,
  })
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

  teapots.scale.x = size
  teapots.scale.y = size
  teapots.scale.z = size
  if (modifier) {
    if (sx) teapots.rotateX(MathUtils.degToRad(modifier))
    if (sy) teapots.rotateY(MathUtils.degToRad(modifier))
    if (sz) teapots.rotateZ(MathUtils.degToRad(modifier))
  }

  return teapots
}

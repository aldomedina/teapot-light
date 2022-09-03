import {
  Euler,
  Group,
  InstancedMesh,
  Matrix4,
  MeshBasicMaterial,
  Quaternion,
  Vector3,
} from 'three'

import createLambertFilmGrainMaterial from '../materials/createLambertFilmGrainMaterial'
import createTeapotGeometry from './createTeapotGeometry'

const count = 300
export default function createInstancedTeapot(config, palette) {
  const {
    size,
    rotation: { x, y, z },
    settings,
  } = config

  const geometry = createTeapotGeometry(size)
  const material = createLambertFilmGrainMaterial(palette, true)

  const insideMaterial = new MeshBasicMaterial({
    color: palette.teapot_shadow,
  })

  const matrix = new Matrix4()
  const mesh = new InstancedMesh(geometry, material, count)
  const insideMesh = new InstancedMesh(geometry, insideMaterial, count)
  for (let i = 0; i < count; i++) {
    const position = new Vector3()
    const rotation = new Euler()
    const quaternion = new Quaternion()
    const scale = new Vector3()
    position.x = Math.random() * 16 - 8
    position.y = Math.random() * 16 - 8
    position.z = Math.random() * 16 - 8

    rotation.x = Math.random() * 2 * Math.PI
    rotation.y = Math.random() * 2 * Math.PI
    rotation.z = Math.random() * 2 * Math.PI

    quaternion.setFromEuler(rotation)

    scale.x = scale.y = scale.z = Math.random() * 1

    matrix.compose(position, quaternion, scale)
    mesh.setMatrixAt(i, matrix)
    insideMesh.setMatrixAt(i, matrix)
  }
  const group = new Group()
  group.add(mesh, insideMesh)
  return group
}

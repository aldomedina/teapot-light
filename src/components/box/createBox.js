import { Group, Mesh, MeshBasicMaterial, PlaneBufferGeometry } from 'three'
import createBoxGeometry from './createBoxGeometry'
import createGradientMaterial from '../materials/createGradientMaterial'

export default function createBox(palette, modifier) {
  const { bgPlano, planoPosition, x, y } = modifier
  if (bgPlano) {
    const { col1, col2, col3, col4 } = palette
    const geometry1 = new PlaneBufferGeometry(20, 20)
    const material1 = new MeshBasicMaterial({ color: col1 })
    const plane1 = new Mesh(geometry1, material1)

    const geometry2 = new PlaneBufferGeometry(18, 18)
    const material2 = new MeshBasicMaterial({ color: col2 })
    const plane2 = new Mesh(geometry2, material2)

    const geometry3 = new PlaneBufferGeometry(16, 16)
    const material3 = new MeshBasicMaterial({ color: col3 })
    const plane3 = new Mesh(geometry3, material3)

    const geometry4 = new PlaneBufferGeometry(14, 14)
    const material4 = new MeshBasicMaterial({ color: col4 })
    const plane4 = new Mesh(geometry4, material4)

    plane1.position.z = 2
    plane2.position.z = 2
    plane3.position.z = 2
    plane4.position.z = 2

    if (planoPosition === 'tr') {
      plane2.position.x = 1
      plane3.position.x = 2
      plane4.position.x = 3

      plane2.position.y = 1
      plane3.position.y = 2
      plane4.position.y = 3
    }
    if (planoPosition === 'tl') {
      plane2.position.x = -1
      plane3.position.x = -2
      plane4.position.x = -3

      plane2.position.y = 1
      plane3.position.y = 2
      plane4.position.y = 3
    }
    if (planoPosition === 'bl') {
      plane2.position.x = -1
      plane3.position.x = -2
      plane4.position.x = -3

      plane2.position.y = -1
      plane3.position.y = -2
      plane4.position.y = -3
    }
    if (planoPosition === 'br') {
      plane2.position.x = 1
      plane3.position.x = 2
      plane4.position.x = 3

      plane2.position.y = -1
      plane3.position.y = -2
      plane4.position.y = -3
    }

    const bg = new Group()
    bg.add(plane1, plane2, plane3, plane4)

    return bg
  }
  const geometry = createBoxGeometry(modifier)
  const material = createGradientMaterial(palette)
  const box = new Mesh(geometry, material)
  return box
}

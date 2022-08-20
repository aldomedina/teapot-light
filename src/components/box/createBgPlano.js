import { Group, Mesh, MeshBasicMaterial, PlaneBufferGeometry } from 'three'

export default function createBgPlano(palette, planoPosition) {
  const { col1, col2, col3, col4 } = palette
  const geometry1 = new PlaneBufferGeometry(20, 20)
  const material1 = new MeshBasicMaterial({ color: col1 })
  const plane1 = new Mesh(geometry1, material1)

  const geometry2 = new PlaneBufferGeometry(16, 16)
  const material2 = new MeshBasicMaterial({ color: col2 })
  const plane2 = new Mesh(geometry2, material2)

  const geometry3 = new PlaneBufferGeometry(12, 12)
  const material3 = new MeshBasicMaterial({ color: col3 })
  const plane3 = new Mesh(geometry3, material3)

  const geometry4 = new PlaneBufferGeometry(8, 8)
  const material4 = new MeshBasicMaterial({ color: col4 })
  const plane4 = new Mesh(geometry4, material4)

  plane1.position.z = 2
  plane2.position.z = 2
  plane3.position.z = 2
  plane4.position.z = 2

  if (planoPosition === 'tr') {
    plane2.position.x = 2
    plane3.position.x = 4
    plane4.position.x = 6

    plane2.position.y = 2
    plane3.position.y = 4
    plane4.position.y = 6
  }
  if (planoPosition === 'tl') {
    plane2.position.x = -2
    plane3.position.x = -4
    plane4.position.x = -6

    plane2.position.y = 2
    plane3.position.y = 4
    plane4.position.y = 6
  }
  if (planoPosition === 'bl') {
    plane2.position.x = -2
    plane3.position.x = -4
    plane4.position.x = -6

    plane2.position.y = -2
    plane3.position.y = -4
    plane4.position.y = -6
  }
  if (planoPosition === 'br') {
    plane2.position.x = 2
    plane3.position.x = 4
    plane4.position.x = 6

    plane2.position.y = -2
    plane3.position.y = -4
    plane4.position.y = -6
  }

  const bg = new Group()
  bg.add(plane1, plane2, plane3, plane4)

  return bg
}

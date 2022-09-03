import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry.js'

export default function createTeapotGeometry(segments) {
  const bottom = true
  const lib = true
  const body = true
  const fitLid = true
  const blinn = true
  const geometry = new TeapotGeometry(
    1,
    segments,
    bottom,
    lib,
    body,
    fitLid,
    blinn
  )

  return geometry
}

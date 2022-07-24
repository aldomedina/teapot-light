export default function createScreenShot(renderer, scene, camera) {
  renderer.render(scene, camera)
  const url = renderer.domElement
    .toDataURL()
    .replace('image/png', 'image/octet-stream')
  return url
}

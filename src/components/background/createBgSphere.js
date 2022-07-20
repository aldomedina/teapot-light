import { Mesh, SphereBufferGeometry, MeshBasicMaterial, Color } from "three";

export default function createBgSphere(palette) {
  const { bg } = palette;
  const geometry = new SphereBufferGeometry(800, 32, 32);
  const material = new MeshBasicMaterial({
    color: new Color(bg),
  });

  geometry.scale(-1, 1, 1);
  const sphere = new Mesh(geometry, material);
  return sphere;
}

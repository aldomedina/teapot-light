import { Group, Mesh, MeshBasicMaterial, MathUtils } from "three";
import createLambertFilmGrainMaterial from "../materials/createLambertFilmGrainMaterial";
import createTeapotGeometry from "./createTeapotGeometry";

export default function createTeapot(config, palette) {
  const {
    size,
    rotation: { x, y, z },
  } = config;

  const geometry = createTeapotGeometry(size);
  const material = createLambertFilmGrainMaterial(palette, true);
  const outsideTeapot = new Mesh(geometry, material);
  outsideTeapot.castShadow = true;
  outsideTeapot.receiveShadow = true;

  const insideGeometry = geometry.clone();
  const insideMaterial = new MeshBasicMaterial({
    color: palette.teapot_shadow,
  });
  insideGeometry.scale(0.999, 0.999, 0.999);
  const insideTeapot = new Mesh(insideGeometry, insideMaterial);
  insideTeapot.name = "inside";
  outsideTeapot.name = "outside";
  const teapot = new Group();
  teapot.add(outsideTeapot, insideTeapot);
  teapot.rotateX(MathUtils.degToRad(x));
  teapot.rotateY(MathUtils.degToRad(y));
  teapot.rotateZ(MathUtils.degToRad(z));

  teapot.scale.x = size;
  teapot.scale.y = size;
  teapot.scale.z = size;
  return teapot;
}

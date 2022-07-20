import { Mesh } from "three";
import createBoxGeometry from "./createBoxGeometry";
import createGradientMaterial from "../materials/createGradientMaterial";

export default function createBox(palette, modifier) {
  const geometry = createBoxGeometry(modifier);
  const material = createGradientMaterial(palette);
  const box = new Mesh(geometry, material);
  return box;
}

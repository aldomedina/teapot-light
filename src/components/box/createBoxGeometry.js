import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";
import { PlaneBufferGeometry, MathUtils } from "three";

export default function createBoxGeometry(modifier) {
  const { magnitude, left, right, top, bottom } = modifier;
  const { degToRad } = MathUtils;
  const size = 5;
  // geometries
  const plane = new PlaneBufferGeometry(size * 2, size * 2);
  const backGeometry = plane.clone();
  const leftGeometry = plane.clone();
  leftGeometry.rotateY(degToRad(90));
  leftGeometry.translate(-size, 0, size);

  const rightGeometry = plane.clone();
  rightGeometry.rotateY(degToRad(90));
  rightGeometry.translate(size, 0, size);

  const topGeometry = plane.clone();
  topGeometry.rotateX(degToRad(90));
  topGeometry.translate(0, size, size);

  const bottomGeometry = plane.clone();
  bottomGeometry.rotateX(degToRad(90));
  bottomGeometry.translate(0, -size, size);

  if (left) {
    // top
    backGeometry.attributes.position.array[0] += magnitude;
    leftGeometry.attributes.position.array[3] += magnitude;
    topGeometry.attributes.position.array[6] += magnitude;

    // bottom
    backGeometry.attributes.position.array[6] += magnitude;
    leftGeometry.attributes.position.array[9] += magnitude;
    bottomGeometry.attributes.position.array[6] += magnitude;
  }

  if (right) {
    // top
    backGeometry.attributes.position.array[3] -= magnitude;
    rightGeometry.attributes.position.array[3] -= magnitude;
    topGeometry.attributes.position.array[9] -= magnitude;

    // bottom
    backGeometry.attributes.position.array[9] -= magnitude;
    rightGeometry.attributes.position.array[9] -= magnitude;
    bottomGeometry.attributes.position.array[9] -= magnitude;
  }

  if (top) {
    // left
    backGeometry.attributes.position.array[1] -= magnitude;
    leftGeometry.attributes.position.array[4] -= magnitude;
    topGeometry.attributes.position.array[7] -= magnitude;

    // right
    backGeometry.attributes.position.array[4] -= magnitude;
    rightGeometry.attributes.position.array[4] -= magnitude;
    topGeometry.attributes.position.array[10] -= magnitude;
  }

  if (bottom) {
    // left
    backGeometry.attributes.position.array[7] += magnitude;
    leftGeometry.attributes.position.array[10] += magnitude;
    bottomGeometry.attributes.position.array[7] += magnitude;

    //right
    backGeometry.attributes.position.array[10] += magnitude;
    rightGeometry.attributes.position.array[10] += magnitude;
    bottomGeometry.attributes.position.array[10] += magnitude;
  }

  return mergeBufferGeometries([
    backGeometry,
    leftGeometry,
    rightGeometry,
    topGeometry,
    bottomGeometry,
  ]);
}

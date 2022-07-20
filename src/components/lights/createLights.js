import { AmbientLight, SpotLight, Group } from "three";

export default function createLights(config) {
  const {
    position: { x, y, z },
    intensity,
  } = config;
  const mainLight = new SpotLight(0xffffff, intensity);
  mainLight.castShadow = true;
  mainLight.shadowCameraVisible = true;
  mainLight.shadow.mapSize.width = 1024;
  mainLight.shadow.mapSize.height = 1024;

  mainLight.shadow.camera.fov = 220;
  mainLight.position.set(x, y, z);

  return mainLight;
}

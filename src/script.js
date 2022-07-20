import "./style.css";
import * as THREE from "three";
import * as dat from "lil-gui";

import createBgSphere from "./components/background/createBgSphere";
import createBox from "./components/box/createBox";
import config from "./config";
import createLights from "./components/lights/createLights";
import createTeapot from "./components/teapot/createTeapot";
import { Color, MathUtils } from "three";
/**
 * Base
 */
// Debug
const { modifier, palette, teapot_config, lights_config, camera_config } =
  config;
const gui = new dat.GUI();
const gui_palette = gui.addFolder("palette");
gui_palette.addColor(palette, "bg");
gui_palette.addColor(palette, "col1");
gui_palette.addColor(palette, "col2");
gui_palette.addColor(palette, "col3");
gui_palette.addColor(palette, "col4");
gui_palette.addColor(palette, "teapot");
gui_palette.addColor(palette, "teapot_shadow");

// const gui_modifier = gui.addFolder("modifier");
// gui_modifier.add(modifier, "magnitude");
// gui_modifier.add(modifier, "left");
// gui_modifier.add(modifier, "right");
// gui_modifier.add(modifier, "top");
// gui_modifier.add(modifier, "bottom");

const gui_teapot_config = gui.addFolder("teapot config");
gui_teapot_config.add(teapot_config, "size");
gui_teapot_config.add(teapot_config, "depth");
const gui_teapot_rotation = gui_teapot_config.addFolder("teapot rotation");
gui_teapot_rotation.add(teapot_config.rotation, "x");
gui_teapot_rotation.add(teapot_config.rotation, "y");
gui_teapot_rotation.add(teapot_config.rotation, "z");

const gui_lights_config = gui.addFolder("spotlight config");
const gui_lights_config_position =
  gui_lights_config.addFolder("spotlight position");
gui_lights_config_position.add(lights_config.position, "x");
gui_lights_config_position.add(lights_config.position, "y");
gui_lights_config_position.add(lights_config.position, "z");
gui_lights_config.add(lights_config, "intensity");

const gui_camera = gui.addFolder("camera position");
gui_camera.add(camera_config, "x");
gui_camera.add(camera_config, "y");
gui_camera.add(camera_config, "z");
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const bgSphere = createBgSphere(palette);
const box = createBox(palette, modifier);
console.log(box.material.uniforms);
box.translateZ(teapot_config.depth);
const spotlight = createLights(lights_config);
const teapot = createTeapot(teapot_config, palette);

spotlight.target = teapot;
scene.add(bgSphere, box, teapot, spotlight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);

camera.position.z = camera_config.z;
camera.lookAt(teapot.position);
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;
/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  // controls.update();

  // Render
  renderer.render(scene, camera);

  // gui update
  bgSphere.material.color = new Color(config.palette.bg);
  box.material.uniforms.firstColor.value = new Color(config.palette.col1);
  box.material.uniforms.secondColor.value = new Color(config.palette.col2);
  box.material.uniforms.thirdColor.value = new Color(config.palette.col3);
  box.material.uniforms.fourthColor.value = new Color(config.palette.col4);
  box.position.z = teapot_config.depth;
  teapot.children[1].material.color = new Color(config.palette.teapot);
  teapot.children[0].material.uniforms.uColor.value = new Color(
    config.palette.teapot_shadow
  );
  teapot.rotation.x = MathUtils.degToRad(config.teapot_config.rotation.x);
  teapot.rotation.y = MathUtils.degToRad(config.teapot_config.rotation.y);
  teapot.rotation.z = MathUtils.degToRad(config.teapot_config.rotation.z);

  teapot.scale.x = config.teapot_config.size;
  teapot.scale.y = config.teapot_config.size;
  teapot.scale.z = config.teapot_config.size;

  spotlight.position.x = config.lights_config.position.x;
  spotlight.position.y = config.lights_config.position.y;
  spotlight.position.z = config.lights_config.position.z;
  spotlight.intensity = config.lights_config.intensity;

  camera.position.x = camera_config.x;
  camera.position.y = camera_config.y;
  camera.position.z = camera_config.z;
  camera.lookAt(teapot.position);
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

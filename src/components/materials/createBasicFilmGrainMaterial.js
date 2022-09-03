import { DoubleSide } from 'three'
import { Color, ShaderMaterial, ShaderLib, UniformsUtils } from 'three'
import { snoise, rotationShader, pnoise } from '../../utils'

const vertexShader = `
#define LAMBERT
varying vec3 vLightFront;
varying vec3 vIndirectFront;
varying float vDistort;
  
uniform float uTime;
uniform float uSpeed;
uniform float uNoiseDensity;
uniform float uNoiseStrength;
uniform float uFrequency;
uniform float uAmplitude;

${pnoise}
${rotationShader}
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>


  float t = uTime * uSpeed;
  float distortion = pnoise((normal + t) * uNoiseDensity, vec3(10.0)) * uNoiseStrength;

  vec3 pos = position + (normal * distortion);
  float angle = sin(uv.y * uFrequency + t) * uAmplitude;
  pos = rotateY(pos, angle);    
  
  vDistort = distortion;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
`

const fragmentShader = `
    ${snoise}

    uniform vec3 uColor;
    uniform vec3 uLightColor;
    uniform float uLightIntensity;
    uniform float uNoiseScale;
    uniform float uNoiseCoef;
    
    uniform vec3 diffuse;
    uniform float opacity;
    #ifndef FLAT_SHADED
      varying vec3 vNormal;
    #endif
    #include <common>
    #include <dithering_pars_fragment>
    #include <color_pars_fragment>
    #include <uv_pars_fragment>
    #include <uv2_pars_fragment>
    #include <map_pars_fragment>
    #include <alphamap_pars_fragment>
    #include <alphatest_pars_fragment>
    #include <aomap_pars_fragment>
    #include <lightmap_pars_fragment>
    #include <envmap_common_pars_fragment>
    #include <envmap_pars_fragment>
    #include <cube_uv_reflection_fragment>
    #include <fog_pars_fragment>
    #include <specularmap_pars_fragment>
    #include <logdepthbuf_pars_fragment>
    #include <clipping_planes_pars_fragment>
    void main() {
      #include <clipping_planes_fragment>
      vec4 diffuseColor = vec4( diffuse, opacity );
      #include <logdepthbuf_fragment>
      #include <map_fragment>
      #include <color_fragment>
      #include <alphamap_fragment>
      #include <alphatest_fragment>
      #include <specularmap_fragment>
      ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
      #ifdef USE_LIGHTMAP
        vec4 lightMapTexel = texture2D( lightMap, vUv2 );
        reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
      #else
        reflectedLight.indirectDiffuse += vec3( 1.0 );
      #endif
      #include <aomap_fragment>
      reflectedLight.indirectDiffuse *= diffuseColor.rgb;
      vec3 outgoingLight = reflectedLight.indirectDiffuse;
      #include <envmap_fragment>
      #include <output_fragment>
      #include <tonemapping_fragment>
      #include <encodings_fragment>
      #include <fog_fragment>
      #include <premultiplied_alpha_fragment>
      #include <dithering_fragment>
    
      // grain
      vec2 uv = gl_FragCoord.xy;
      uv /= uNoiseScale;
    
      vec3 colorNoise = vec3(snoise(uv) * 0.5 + 0.5);
      colorNoise *= pow(outgoingLight.r, uNoiseCoef);
    


      gl_FragColor.r = max(colorNoise.r, uColor.r);
      gl_FragColor.g = max(colorNoise.g, uColor.g);
      gl_FragColor.b = max(colorNoise.b, uColor.b);
      gl_FragColor.a = 1. - colorNoise.r;

      
    }    
`

export default function createBasicFilmGrainMaterial(palette, compo, settings) {
  console.log(ShaderLib.basic)
  const color = compo === 'grainy-box' ? palette.bg : palette.teapot_shadow
  const material = new ShaderMaterial({
    side: DoubleSide,
    vertexShader,
    fragmentShader: ShaderLib.basic.fragmentShader,

    uniforms: UniformsUtils.merge([
      ShaderLib.basic.uniforms,
      {
        diffuse: { value: new Color(color) },
        uTime: { value: 0 },
        uSpeed: { value: settings.speed },
        uNoiseDensity: { value: settings.density },
        uNoiseStrength: { value: settings.strength },
        uFrequency: { value: settings.frequency },
        uAmplitude: { value: settings.amplitude },
        uIntensity: { value: settings.intensity },
      },
    ]),
  })

  return material
}

import { DoubleSide } from "three";
import { Color, ShaderMaterial, ShaderLib, UniformsUtils } from "three";
import { snoise } from "../../utils";

const fragmentShader = `
    ${snoise}

    uniform vec3 uColor;
    uniform vec3 uLightColor;
    uniform float uLightIntensity;
    uniform float uNoiseScale;
    uniform float uNoiseCoef;
    
    uniform vec3 diffuse;
    uniform vec3 emissive;
    uniform float opacity;
    
    varying vec3 vLightFront;
    varying vec3 vIndirectFront;
    
    #ifdef DOUBLE_SIDED
      varying vec3 vLightBack;
      varying vec3 vIndirectBack;
    #endif
    
    
    #include <common>
    #include <packing>
    #include <dithering_pars_fragment>
    #include <color_pars_fragment>
    #include <uv_pars_fragment>
    #include <uv2_pars_fragment>
    #include <map_pars_fragment>
    #include <alphamap_pars_fragment>
    #include <alphatest_pars_fragment>
    #include <aomap_pars_fragment>
    #include <lightmap_pars_fragment>
    #include <emissivemap_pars_fragment>
    #include <envmap_common_pars_fragment>
    #include <envmap_pars_fragment>
    #include <cube_uv_reflection_fragment>
    #include <bsdfs>
    #include <lights_pars_begin>
    #include <fog_pars_fragment>
    #include <shadowmap_pars_fragment>
    #include <shadowmask_pars_fragment>
    #include <specularmap_pars_fragment>
    #include <logdepthbuf_pars_fragment>
    #include <clipping_planes_pars_fragment>
    
    void main() {
    
      #include <clipping_planes_fragment>
    
      vec4 diffuseColor = vec4( diffuse, opacity );
      ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
      vec3 totalEmissiveRadiance = emissive;
    
      #include <logdepthbuf_fragment>
      #include <map_fragment>
      #include <color_fragment>
      #include <alphamap_fragment>
      #include <alphatest_fragment>
      #include <specularmap_fragment>
      #include <emissivemap_fragment>
    
      // accumulation
    
      #ifdef DOUBLE_SIDED
    
        reflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;
    
      #else
    
        reflectedLight.indirectDiffuse += vIndirectFront;
    
      #endif
    
      #include <lightmap_fragment>
    
      reflectedLight.indirectDiffuse *= BRDF_Lambert( diffuseColor.rgb );
    
      #ifdef DOUBLE_SIDED
    
        reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;
    
      #else
    
        reflectedLight.directDiffuse = vLightFront;
    
      #endif
    
      reflectedLight.directDiffuse *= BRDF_Lambert( diffuseColor.rgb ) * getShadowMask();
    
      // modulation
    
      #include <aomap_fragment>
    
      vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
    
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
`;

export default function createLambertFilmGrainMaterial(palette, transparent) {
  const material = new ShaderMaterial({
    side: DoubleSide,
    vertexShader: ShaderLib.lambert.vertexShader,
    lights: true,
    transparent,
    fragmentShader: fragmentShader,
    uniforms: UniformsUtils.merge([
      ShaderLib.lambert.uniforms,
      {
        uColor: {
          value: new Color(palette.teapot),
        },
        uNoiseCoef: {
          value: 3.5,
        },
        uNoiseScale: {
          value: 0.8,
        },
      },
    ]),
  });

  return material;
}

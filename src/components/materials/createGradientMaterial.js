import { ShaderMaterial, DoubleSide, Color } from 'three'

export default function createGradientMaterial(palette) {
  const { col1, col2, col3, col4 } = palette
  const material = new ShaderMaterial({
    side: DoubleSide,
    uniforms: {
      bboxMin: {
        value: {
          x: -9.523809432983398,
          y: -5,
          z: -6.349206447601318,
        },
      },
      bboxMax: {
        value: {
          x: 10.901825904846191,
          y: 3.5,
          z: 6.349206447601318,
        },
      },
      firstColor: {
        value: new Color(col4),
      },
      secondColor: {
        value: new Color(col3),
      },
      thirdColor: {
        value: new Color(col2),
      },
      fourthColor: {
        value: new Color(col1),
      },
      lights: true, // add this,
      fog: true,
    },
    vertexShader: `
    
        uniform vec3 bboxMin;
        uniform vec3 bboxMax;
    
        varying vec2 vUv;
    
        void main() {
          vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
        `,
    fragmentShader: `
        uniform vec3 firstColor;
        uniform vec3 secondColor;
        uniform vec3 thirdColor;
        uniform vec3 fourthColor;
    
        varying vec2 vUv;        
        
        void main() {
          float h = 0.333; // adjust position of middleColor
          
          vec3 col1 = mix(mix(firstColor, secondColor, vUv.y/h), mix(secondColor, thirdColor, (vUv.y - h)/(1.0 - h*2.0)), step(h, vUv.y));  
          vec3 col2 = mix(mix(secondColor, thirdColor, (vUv.y - h)/(1.0 - h*2.0)), mix(thirdColor, fourthColor, (vUv.y - h*2.0)/(1.0-h*2.0)), step(h*2.0, vUv.y));
          vec3 finalColor = mix(col1,col2,step(h*2.0,vUv.y));
    
          gl_FragColor = vec4(finalColor, 1.0);
        }
          `,
  })

  return material
}

import * as THREE from 'three';

export default {
  name: 'Shader 01',
  uniforms: {
    u_time: { type: 'f', value: 1.0 },
    u_resolution: { type: 'v2', value: new THREE.Vector2() },
    u_mouse: { type: 'v2', value: new THREE.Vector2() },
  },
  vertexShader: `
  void main() {
    gl_Position = vec4( position, 1.0 );
}`,
  fragmentShader: `
  #ifdef GL_ES
  precision mediump float;
  #endif
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec2 mouse = u_mouse/u_resolution-vec2(0.5);
    mouse.y=(u_resolution.y-u_mouse.y)/u_resolution.y-vec2(0.5).y;
    
    //aspect ratio
    //mouse.x=mouse.x*u_resolution.x/u_resolution.y-vec2(0.5).y;

    st -= mouse;
    vec3 color = vec3(0.0);
    float d = 0.0;
    // Remap the space to -1. to 1.
    st = st *2.-1.;
    // Make the distance field
    //d = length( abs(st)-.3 );
    d = length( min(abs(st)-0.708,0.) );

    // Visualize the distance field
    gl_FragColor = vec4(vec3(fract(d*9.568)),1.0);

  }
  `,
};

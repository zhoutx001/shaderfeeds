import * as THREE from 'three';

export default {
  name: '09',
  uniforms: {
    u_time: { type: 'f', value: 100.0 },
    u_resolution: { type: 'v2', value: new THREE.Vector2() },
    u_mouse: { type: 'v2', value: new THREE.Vector2() },
  },
  vertexShader: `
  void main() {
    gl_Position = vec4( position, 1.0 );
}`,
  fragmentShader: `
  // Author @patriciogv - 2015
  // Title: Ikeda Data Stream
  
  #ifdef GL_ES
  precision highp float;
  #endif
  #define PI 3.14159265359
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  
  float random (in float x) {
      return fract(sin(x)*1e4);
  }
  
  float random (in vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
  }
  
  float pattern(vec2 st, vec2 v, float t) {
      vec2 p = floor(st+v);
      return step(t, random(9.440+p*.000001)+random(p.x)*0.5 );
  }
  
  mat2 rotate2d(float _angle){
      return mat2(cos(_angle),-sin(_angle),
                  sin(_angle),cos(_angle));
  }
  
  void main() {
      vec2 st = gl_FragCoord.xy/u_resolution.xy;
      st.x *= u_resolution.x/u_resolution.y;
  
      vec2 grid = vec2(100.0,50.);
      st *= grid;
      st = rotate2d( 0.5*PI ) * st;
      vec2 ipos = floor(st);  // integer
      vec2 fpos = fract(st);  // fraction
  
      vec2 vel = vec2(u_time*2.*max(grid.y,grid.x)); // time
      vel *= vec2(0.010,0.070) * random(2.672+ipos.y); // direction
  
      // Assign a random value base on the integer coord
      vec2 offset = vec2(-0.050,-0.240);
  
      vec3 color = vec3(0.025,0.025,0.025);
      color.r = pattern(st+offset,vel,0.5+0.0/u_resolution.y);
      color.g = pattern(st,vel,0.5+0.0/u_resolution.y);
      color.b = pattern(st-offset,vel,0.5+0.0/u_resolution.y);
  
      // Margins
      color *= step(-0.152,fpos.y);
  
      gl_FragColor = vec4(1.0-color,1.0);
  }
  
    

  `,
};

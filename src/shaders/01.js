import * as THREE from 'three';

export default {
  name: '01',
  uniforms: {
    u_time: { type: 'f', value: 5.0 },
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
      return step(t, random(100.+p*.000001)+random(p.y)*0.220 );
  }
    vec2 rotate2D (vec2 _st, float _angle) {
        _st -= 0.5;
        _st =  mat2(cos(_angle),-sin(_angle),
                    sin(_angle),cos(_angle)) * _st;
        _st += 0.5;
        return _st;
    }
  void main() {
      vec2 st = gl_FragCoord.xy/u_resolution.xy;

      st.y *= u_resolution.y/u_resolution.x;
  
      vec2 grid = vec2(50.0,100.);

      st *= grid;

      
      vec2 ipos = floor(st);  // integer
      vec2 fpos = fract(st);  // fraction
  
      vec2 vel = vec2(u_time*.700*max(grid.x,grid.y)); // time

      vel *= vec2(0.0,1.) * random(2.+ipos.x); // direction
  
      // Assign a random value base on the integer coord
      vec2 offset = vec2(0.0,0.1);
  
      vec3 color = vec3(0.);

      color.r = pattern(st+offset,vel,0.5);
      color.g = pattern(st,vel,0.5);
      color.b = pattern(st-offset,vel,0.5);
  
      // Margins
      //color *= step(0.2,fpos.y);
      color *= step(fpos.x,0.7);
  
      gl_FragColor = vec4(1.0-color,1.0);
  }
  
  `,
};

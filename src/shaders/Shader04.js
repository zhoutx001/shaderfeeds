import * as THREE from 'three';

export default {
  name: 'Shader 04',
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
  // Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

  #ifdef GL_ES
  precision highp float;
  #endif
  
  #define PI 3.14159265358979323846
  
  uniform vec2 u_resolution;
  uniform float u_time;
  
  float parabola( float x, float k ){
      return pow( 4.0*x*(1.0-x), k );
  }
  float pcurve( float x, float a, float b ){
      float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));
      return k * pow( x, a ) * pow( 1.0-x, b );
  }
  vec2 rotate2D (vec2 _st, float _angle) {
      _st -= 0.5;
      _st =  mat2(cos(_angle),-sin(_angle),
                  sin(_angle),cos(_angle)) * _st;
      _st += 0.5;
      return _st;
  }
  
  vec2 tile (vec2 _st, float _zoom) {
      _st *= _zoom;
      return fract(_st);
  }
  
  vec2 rotateTilePattern(vec2 _st){
  
      float tilePatternTime = fract(u_time);
      //  Scale the coordinate system by 2x2
     // _st *= -1.968*tilePatternTime;
      _st *= -1.968;
  
      //  Give each cell an index number
      //  according to its position
      float index = 0.0;
      index += step(1., mod(_st.x,2.0));
      index += step(1., mod(_st.y,2.0))*2.0;
  
      //      |
      //  2   |   3
      //      |
      //--------------
      //      |
      //  0   |   1
      //      |
  
      // Make each cell between 0.0 - 1.0
      _st = fract(_st);
  
      // Rotate each cell according to the index
      if(index == 1.0){
          //  Rotate cell 1 by 90 degrees
          _st = rotate2D(_st,PI*0.5);
      } else if(index == 2.0){
          //  Rotate cell 2 by -90 degrees
          _st = rotate2D(_st,PI*-0.5);
      } else if(index == 3.0){
          //  Rotate cell 3 by 180 degrees
          _st = rotate2D(_st,PI);
      }
  
      return _st;
  }
  
  void main (void) {
      
      float tilePatternT = fract(abs(cos(u_time)));
      float tileT = u_time;
      vec2 st = gl_FragCoord.xy/u_resolution.xy-vec2(0.5); 
      st = rotateTilePattern(st*abs(cos(tilePatternT)));
      st = rotateTilePattern(st*-0.656);
      st = rotate2D(st,PI*u_time*-0.3);
      st = tile(st,3.000);
      st = rotate2D(st,PI*u_time*-.01);
  
      // step(st.x,st.y) just makes a b&w triangles
      // but you can use whatever design you want.
      gl_FragColor = vec4(vec3(step(st.x,st.y)),1.0);
      //gl_FragColor = vec4(st.x,st.y,color.x,1.0);
  }
  
  
  `,
};

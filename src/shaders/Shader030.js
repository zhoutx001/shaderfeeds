//casade windmills slide fade in-n-out
import * as THREE from 'three';

export default {
  name: 'Shader 030',
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
  #define TWO_PI 6.28318530717958647693
  
  uniform vec2 u_resolution;
  uniform float u_time;
  
  float box(in vec2 st, in vec2 size){
      size = vec2(0.5) - size*0.5;
      vec2 uv = smoothstep(size,
                          size+vec2(0.001),
                          st);
      uv *= smoothstep(size,
                      size+vec2(0.001),
                      vec2(1.0)-st);
      return uv.x*uv.y;
  }
  
  float cross(in vec2 st, float size){
      return  box(st, vec2(size,size/4.)) +
              box(st, vec2(size/4.,size));
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
  
  vec2 brickTile(vec2 _st, float _zoom){
    _st *= _zoom;
    if (fract(_st.y * 0.5) > 0.5){
        _st.x += 0.5;
    }
    return fract(_st);
  }
  
  vec2 rotateTile(vec2 _st){
      _st *= 2.0;
  
      float index = 0.0;
      if (fract(_st.x * 0.5) > 0.5){
          index += 1.0;
      }
      if (fract(_st.y * 0.5) > 0.5){
          index += 2.0;
      }
  
      _st = fract(_st);
  
      if(index == 1.0){
          _st = rotate2D(_st,PI*0.5);
      } else if(index == 2.0){
          _st = rotate2D(_st,PI*-0.5);
      } else if(index == 3.0){
          _st = rotate2D(_st,PI);
      }
  
      return _st;
  }
  
  float circle(vec2 _st, float _radius){
    vec2 pos = vec2(0.500,0.630)-_st;
    _radius *= 0.5;
    return 1.-smoothstep(_radius-(_radius*0.258),_radius+(_radius*0.874),dot(pos,pos)*2.524);
  }
  // Based on https://www.shadertoy.com/view/4sSSzG
  float triangle (vec2 _st,
                  vec2 _p0, vec2 _p1, vec2 _p2,
                  float _smoothness) {
    vec3 e0, e1, e2;
  
    e0.xy = normalize(_p1 - _p0).yx * vec2(+1.0, -1.0);
    e1.xy = normalize(_p2 - _p1).yx * vec2(+1.0, -1.0);
    e2.xy = normalize(_p0 - _p2).yx * vec2(+1.0, -1.0);
  
    e0.z = dot(e0.xy, _p0) - _smoothness;
    e1.z = dot(e1.xy, _p1) - _smoothness;
    e2.z = dot(e2.xy, _p2) - _smoothness;
  
    float a = max(0.0, dot(e0.xy, _st) - e0.z);
    float b = max(0.0, dot(e1.xy, _st) - e1.z);
    float c = max(0.0, dot(e2.xy, _st) - e2.z);
  
    return smoothstep(_smoothness * 2.512,
                      1e-7,
                      length(vec3(a, b, c)));
  }
  
  float ellipse(vec2 p, vec2 r, float s) {
      return (length(p / r) - s);
  }
  
  float capsule(vec2 p, vec2 a, vec2 b, float r) {
      vec2 pa = p - a, ba = b - a;
      float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
      return length( pa - ba*h ) - r;
  }
  
  float smoothedge(float v) {
      return 1.-smoothstep(0.0, 1.0 / u_resolution.x, v);
  }
  
  mat2 scale(vec2 _scale){
      return mat2(_scale.x,0.0,
                  0.0,_scale.y);
  }
  
  void main (void) {
    //vec2 st = gl_FragCoord.xy/u_resolution.xy-vec2(-0.160,-0.160);
      vec2 st = gl_FragCoord.xy/u_resolution.xy-vec2(-0.500,-0.080);
    float pos;
    pos = u_time*0.50;
     
    //scale
    float scaleX;
    scaleX=st.x/0.25;
    float scaleY;
    scaleY=st.y/0.25;

    st = scale( vec2(1.0,scaleY*0.2) ) * st;
    //x,y
   	//st = scale( vec2(scaleX*0.2,scaleY*0.2) ) * st;
    //st*=pow(pos,0.024);
    
    //translate y-axis 
    st.y+=0.100*pos;
      
    st = tile(st,3.);
     
    
	//strech
    //st = tile(st,-1.552*st.x);
      
    st = rotateTile(st);
    
    float pattern = 0.0;
      
    //clover
//     pattern += ellipse(st,vec2(0.230,0.110),0.964);
//     pattern += ellipse(st-vec2(.1),vec2(0.230,0.110),0.804);
      
//     pattern += capsule(st - vec2(-0.420,-0.410), vec2(-0.040,0.060), vec2(0.770,-0.750), 0.714);
// 	pattern=smoothedge(pattern);
      
	// //windmill
	// pattern += triangle(st+vec2(0.075,-0.07),
	// vec2(0.120,0.150),
	// vec2(-0.100,-0.550),
	// vec2(0.620,-0.150),
	// 0.010);
	// pattern += triangle(st,
	// vec2(-0.520,0.030),
	// vec2(-0.500,0.620),
	// vec2(0.620,-0.150),
	// 0.010);
      
    //rotate
    //st = rotate2D(st,-PI*u_time*0.25);
      
      
    //half capsule
    // pattern+=box(st,vec2(0.21));
    // pattern+=circle(st,0.075);
    
    //circle
    //pattern+=circle(st,0.05);
    
    //cross
    // pattern+=cross(st,.4);
    pattern=smoothedge(1.-pattern);
    
    //circle group
    pattern+=circle(st+vec2(0.,0.05), 0.007)+
                    circle(st+vec2(0.075,-0.07), 0.007)+
                    circle(st+vec2(-0.075,-0.07), 0.007);
      
    //rotate
    st = rotate2D(st,-PI*u_time*0.25);
    	//windmill
	pattern += triangle(st+vec2(0.075,-0.07),
	vec2(0.120,0.150),
	vec2(-0.100,-0.550),
	vec2(0.620,-0.150),
	0.010);
	pattern += triangle(st,
	vec2(-0.520,0.030),
	vec2(-0.500,0.620),
	vec2(0.620,-0.150),
	0.010);
      
      vec3 color = vec3(pattern);
      gl_FragColor = vec4(color,1.0);
  }
  `,
};

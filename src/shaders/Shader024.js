import * as THREE from 'three';

export default {
  name: 'Shader 024',
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
    return smoothstep(0.0, 1.0 / u_resolution.x, v);
}

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy-vec2(.5);

    st = tile(st,3.0);
    st = rotateTile(st);

    float pattern = 0.0;
	
     //st = rotate2D(st,-PI*u_time*0.25);
   
	//pattern+=circle(st- vec2(-0.030,0.430),0.432);
    // pattern+=circle(st+vec2(0.,0.05), 0.007)+
    //                 circle(st+vec2(0.075,-0.07), 0.007)+
    //                 circle(st+vec2(-0.075,-0.07), 0.007);
      //st = rotate2D(st,-PI*u_time*-0.878);
    pattern +=   triangle(st+vec2(0.075,-0.07),
                         vec2(0.120,0.150),
                         vec2(-0.100,-0.550),
                         vec2(0.620,-0.150),
                         0.010);
    st = rotate2D(st,-PI*u_time*0.25);
     pattern +=   triangle(st+vec2(0.075,-0.07),
                         vec2(0.120,0.150),
                         vec2(-0.100,-0.550),
                         vec2(0.620,-0.150),
                         0.010);
   
    pattern+=   triangle(st,
                         vec2(-0.520,0.030),
                         vec2(-0.500,0.620),
                         vec2(0.620,-0.150),
                         0.010);
    
    
	pattern+=capsule(st - vec2(-0.770,0.080), vec2(-0.05, -0.05), vec2(0.05, 0.05), 1.938);
	//pattern+=capsule(st - vec2(-0.890,0.060), vec2(-0.05, -0.05), vec2(0.05, 0.05), -0.006);
    //pattern+=capsule(st - vec2(0.5, 0.8), vec2(-0.05, -0.05), vec2(0.05, 0.05), 1.098);
//pattern+=capsule(st - vec2(0.5, 0.8), vec2(0.720,0.880), vec2(0.05, 0.05), 1.154);
//pattern+=capsule(st - vec2(0.5, 0.8), vec2(0.720,0.880), vec2(0.350,0.790), 1.154);

    //pattern+=circle(st- vec2(-0.030,0.430),1.000);
  //pattern+=capsule(st - vec2(0.5, 0.8), vec2(0.720,0.880), vec2(-0.360,-0.670), 1.258);
    
   pattern=smoothedge(pattern);
    
    vec3 color = vec3(pattern);

    gl_FragColor = vec4(color,1.0);
}


  `,
};

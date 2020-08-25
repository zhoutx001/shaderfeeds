import * as THREE from 'three';

export default {
  name: '02',
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
// Title: Ikeda Digits

#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float random(in float x){ return fract(sin(x)*43758.5453); }
// float random(in vec2 st){ return fract(sin(dot(st.xy ,vec2(12.9898,78.233))) * 43758.5453); }
float random(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }

float bin(vec2 ipos, float n){
    float remain = mod(n,33554432.);
    for(float i = 0.0; i < 25.0; i++){
        if ( floor(i/3.) == ipos.y && mod(i,3.) == ipos.x ) {
            return step(1.0,mod(remain,2.));
        }
        remain = ceil(remain/2.);
    }
    return 0.0;
}

float char(vec2 st, float n){
    st.x = st.x*2.-0.5;
    st.y = st.y*1.2-0.1;

    vec2 grid = vec2(3.,5.);

    vec2 ipos = floor(st*grid);
    vec2 fpos = fract(st*grid);

    n = floor(mod(n,10.));
    float digit = 0.0;

    if(mod(n,3.)==0.){
        digit = 31600.;
    }else if(mod(n,3.)==1.){
        digit = 9363.0;
    }else{
         digit = 1.0;
    }
    float pct = bin(ipos, digit);

    vec2 borders = vec2(1.);
    // borders *= step(0.01,fpos.x) * step(0.01,fpos.y);   // inner
    borders *= step(0.0,st)*step(0.0,1.-st);            // outer

    return step(.5,1.0-pct) * borders.x * borders.y;
}

void main(){
    vec2 st = gl_FragCoord.st/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    float rows = 34.0;
    vec2 ipos = floor(st*rows);
    vec2 fpos = fract(st*rows);

    //ipos += vec2(0.,floor(u_time*1.*random(ipos.y+ipos.x)));
    ipos += vec2(0.,floor(u_time*4.*random(ipos.x+ipos.x)));
    float pct = random(ipos);
    vec3 color = vec3(char(fpos,100.*pct));
    color = mix(color,vec3(color.r,0.,0.),step(.99,pct));

    gl_FragColor = vec4( color , 1.0);
}

  
  `,
};

<template>
  <div ref="scenecontainer">
  </div>
</template>

<script>
/* eslint-disable */
import * as THREE from 'three';
let canvasWidth=window.innerWidth;
let canvasHeight=window.innerWidth;

export default {
  name: 'Scene',
  data() {
    return {};
  },
  props: {
    shaderName: {
      required: true,
      type: Object
    }
  },
  methods: {
    setupScene() {
      // Create renderer.
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      // Set the pixel ratio.
      // This kills performance on high res monitors (especially my laptop)
      //this.renderer.setPixelRatio(window.devicePixelRatio);

      // Create camera.
      this.camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      // Position Camera.
      this.camera.position.z = 1;

      // Create Scene.
      this.scene = new THREE.Scene();

      // Create initial Material.
      this.material = new THREE.ShaderMaterial( {
                uniforms: this.shaderName.uniforms,
                vertexShader: this.shaderName.vertexShader,
                fragmentShader: this.shaderName.fragmentShader,
      } );

      //this.addMesh(this.currentShape);
      this.addMesh();
      if(this.shaderName.uniforms.u_mouse){
      document.onmousemove=function(e){
          // this.shaderName.uniforms.u_mouse.value.x = e.offsetX;
          // this.shaderName.uniforms.u_mouse.value.y = e.offsetY;
          // console.log(this.shaderName.uniforms.u_mouse.value.x);
      }
      }

      // Add resize listener.
      window.addEventListener('resize', this.sizeRenderer.bind(this), false);
    },
    addMesh() {
      this.geometry = new THREE.PlaneBufferGeometry( 2, 2 );
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      //}
      this.scene.add(this.mesh);
    },
    sizeRenderer() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      //this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setSize(canvasWidth, canvasHeight);
      this.shaderName.uniforms.u_resolution.value.x = this.renderer.domElement.width;
      this.shaderName.uniforms.u_resolution.value.y = this.renderer.domElement.height;
    },
    animate() {

      this.shaderName.uniforms.u_time.value+=0.01;
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate.bind(this));
    }
  },
  mounted() {
    this.setupScene();
    this.sizeRenderer();
    this.$refs.scenecontainer.appendChild(this.renderer.domElement);
   this.animate();
  }
};
</script>

<style>

</style>

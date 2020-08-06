<template>
  <div class='vuegram-post'>
    <div class='header level'>
      <div class='level-left'>
        <figure class='image is-32x32'>
          <img :src='shaderpost.userImage' />
        </figure>
        <span class='username'>{{shaderpost.username}}</span>
      </div>
    </div>
    <!-- <div class='image-container'
      :class='shaderpost.filter'
      :style="{ backgroundImage: 'url(' + shaderpost.shaderName + ')' }"
      @dblclick='like'>
    </div> -->

    <div id="threeScene">
<scene
:currentShape="state.currentShape"
:currentShader="state.currentShader"  @animate="animateCallback"/>
    </div>

    <div class='content'>
      <div class='heart'>
        <i class='far fa-heart fa-lg'
           :class="{'fas': this.shaderpost.hasBeenLiked}"
           @click='like'>
        </i>
      </div>
      <p class='likes'>{{shaderpost.likes}} likes</p>
      <p class='caption'><span>{{shaderpost.username}}</span> {{shaderpost.caption}}</p>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import Scene from './Scene';
import basicColor from '../shaders/BasicColor';
/* eslint-disable */
export default {
  name: 'ShaderPost',
  components: {
    Scene,
  },
  props: {
    shaderpost: Object,
  },
  data() {
    return {
      shaders: [
        basicColor
      ],
      shapes: [
        {
          name: 'Cube',
          class: 'BoxGeometry',
          args: [200, 200, 200, 50, 50, 50]
        }
      ],
      state: {
        currentShader: {},
        currentShaderObject: {},
        currentShape: {
          name: 'Cube',
          class: 'BoxGeometry',
          args: [200, 200, 200, 50, 50, 50]
        }
      },
      clock: new THREE.Clock(),
      threeVersion: THREE.REVISION
    };
  },
  methods: {
    like() {
      this.shaderpost.likes = this.shaderpost.hasBeenLiked ? this.shaderpost.likes - 1 : this.shaderpost.likes + 1;
      this.shaderpost.hasBeenLiked = !this.shaderpost.hasBeenLiked;
    },

    getShaderFromName(name) {
      return this.shaders.find(x => x.name === name);
    },
    
    setShaderFromName() {
      let shader = basicColor;
      //create the options object to send to ShaderMaterial.
      let shaderObject = {
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader,
        lights: true
      };
      // Add uniforms if present.
      if ('uniforms' in shader) {
        // Using UniformUtils will clone the shader files uniforms,
        shaderObject.uniforms = THREE.UniformsUtils.merge([
          THREE.UniformsLib['lights'],
          shader.uniforms
        ]);
      }
      // Set this new material on the mesh.
      let material = new THREE.ShaderMaterial(shaderObject);
      // add the original uniforms here so we can loop over them in the Controls, because other uniforms are added that we don't want controls for.
      material.customUniforms = shader.uniforms;

      //this.state.currentShader = material;
      //this.state.currentShaderObject = shader;
      this.state = Object.assign(this.state, {
        currentShader: material,
        currentShaderObject: shader
      });
      //this.setState({ currentShader: material, currentShaderObject: shader });
    },

    animateCallback() {
      if (
        Boolean(this.state.currentShaderObject) &&
        Boolean(this.state.currentShaderObject.update)
      ) {
        this.state.currentShaderObject.update(
          this.state.currentShader.uniforms,
          this.clock
        );
      }
    },

    changeShape(shapeName) {
      this.state.currentShape = this.getShapeFromName(shapeName);
      //this.setState({ currentShape: this.getShapeFromName(shapeName) });
    }
  },
  mounted() {
    this.setShaderFromName();
  }
};
</script>

<style lang='scss' src='../styles/vuegram-post.scss'>
// Styles from stylesheet
</style>

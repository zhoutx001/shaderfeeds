<template>
  <div id='app'>
    <div class='app-phone'>
      <!-- <div class='phone-header'>
        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/vue_gram_logo_cp.png' />
      </div> -->
      <phone-body
        :shaderposts='shaderposts'
        :filters='filters' />
      <!-- <div class='phone-footer'>
       <div class='home-cta'>
        <i class='fas fa-home fa-lg'></i>
       </div>
       <div class='upload-cta'>
        <i class='far fa-plus-square fa-lg'></i>
       </div>
      </div> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import PhoneBody from './components/PhoneBody';

import shaderposts from './data/shaderposts';
import filters from './data/filters';


import * as THREE from 'three';
import * as Vue from 'vue';

import Scene from './components/Scene';

import basicColor from './shaders/BasicColor';

export default {
  name: 'App',
  data() {
    return {
      shaderposts,
      filters,
    };
  },
  components: {
    Scene,
    'phone-body': PhoneBody,
  },
};
</script>

<style lang='scss' src='./styles/app.scss'>
// Styles from stylesheet
</style>

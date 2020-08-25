<template>
  <div class='vuegram-post'>
    <div class='header level'>
      <div class='level-left'>
        <figure class='image is-32x32'>
          <img :src='shaderpost.userImage' />
        </figure>
        <span class='username'>{{shaderpost.username}}</span>
 <p class='caption'><span>  </span></p>
      </div>

    </div>
    <div id="threeScene">
<scene
:shaderName='shaderpost.shaderName' @mousemove="getMouseChange"/>
    </div>

    <div class='content'>
      <!-- <div class='heart'>
        <i class='far fa-heart fa-lg'
           :class="{'fas': this.shaderpost.hasBeenLiked}"
           @click='like'>
        </i>
      </div> -->
      <!-- <p class='likes'>{{shaderpost.likes}} likes</p> -->
      <p class='likes'> ⊠⊠ likes</p>
      
      <p class='caption'><span>{{shaderpost.username}}</span> {{shaderpost.caption1}}</p>
       <!-- <p class='caption'><span>{{shaderpost.username}}</span> {{shaderpost.caption2}}</p>
        <p class='caption'><span>{{shaderpost.username}}</span> {{shaderpost.caption3}}</p> -->
        <p class='caption'><span> {{shaderpost.commentName01}}</span> {{shaderpost.caption2}}</p>
        <p class='caption'><span>{{shaderpost.commentName02}}</span> {{shaderpost.caption3}}</p>
    </div>
  </div>
</template>

<script>

import Scene from './Scene';
// import basicColor from '../shaders/BasicColor';
/* eslint-disable */
export default {
  name: 'ShaderPost',
  data(){
   return {
     mousePos:[
       {
         x:0,
         y:0
       }
     ]
    };
  },
  components: {
    Scene,
  },
  props: {
    shaderpost: Object,
  },

  methods: {
    like() {
      this.shaderpost.likes = this.shaderpost.hasBeenLiked ? this.shaderpost.likes - 1 : this.shaderpost.likes + 1;
      this.shaderpost.hasBeenLiked = !this.shaderpost.hasBeenLiked;
    },
    getMouseChange(e){
      this.mousePos.x=e.offsetX;
      this.mousePos.y=e.offsetY;
    },
  },
};
</script>

<style lang='scss' src='../styles/vuegram-post.scss'>
// Styles from stylesheet
</style>

<template>
  <div class='phone-body'>
    <div class='feed'>
      <shader-post v-for='shaderpost in shaderposts'
        :shaderpost='shaderpost'
        :key='shaderposts.indexOf(shaderpost)'>
      </shader-post>
    </div>
  </div>
</template>

<script>
import ShaderPost from './ShaderPost';

export default {
  name: 'PhoneBody',
  props: {
    shaderposts: Array,
    filters: Array,
  },
  components: {
    'shader-post': ShaderPost,
  },
};
</script>

<style lang='scss' src='../styles/phone-body.scss'>
// Styles from stylesheet
</style>

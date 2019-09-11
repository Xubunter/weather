<template>
  <div class="preloader">
    <Spinner/>
  </div>
</template>

<script>
import Spinner from './Spinner.vue';

export default {
  name: 'Preloader',
  components: {
    Spinner,
  },
};
</script>

<style scoped>
  .preloader{
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    min-height: 500px;
    z-index: 999;
    background: linear-gradient(180deg, #CC9978 0%, #1E2A42 100%), #C4C4C4;
  }
</style>

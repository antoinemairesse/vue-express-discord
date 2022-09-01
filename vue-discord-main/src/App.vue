<script>
import {NWatermark} from 'naive-ui';

export default {
  components: {NWatermark},
};
</script>

<template>
  <n-watermark
      content=""
      cross
      fullscreen
      :font-size="20"
      :width="500"
      :height="500"
  />
  <RouterView/>
</template>

<style scoped>
</style>

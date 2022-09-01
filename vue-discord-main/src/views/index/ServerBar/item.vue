<template>
  <n-tooltip trigger="hover" placement="right">
    <template #trigger>
      <div
          class="w-12 h-12 flex justify-center items-center rounded-full bg-gray_600 hover:bg-green text-green hover:text-white_500 transition-all cursor-pointer"
          @click="$emit('itemClick')"
      >
        <i :class="icon" class="text-2xl"></i>
      </div>
    </template>
    {{ $t(i18nKey) }}
  </n-tooltip>
</template>

<script>
import {NTooltip} from 'naive-ui';

export default {
  name: "item",
  components: {NTooltip},
  props: {
    i18nKey: String,
    icon: String
  }
}
</script>

<style scoped>

</style>
<template>
  <n-modal
    v-model:show="modelValue"
    class="!bg-gray_600 w-[600px]"
    :title="title"
    :on-update:show="(newValue) => $emit('update:modelValue', newValue)"
    preset="card"
  >
    <n-card
      class="!bg-gray_600"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <slot></slot>
    </n-card>
  </n-modal>
</template>

<script>
import { NCard, NModal } from "naive-ui";

export default {
  name: "dialogWrapper",
  components: { NCard, NModal },
  props: {
    modelValue: Boolean,
    title: String,
  },
};
</script>

<style>
.n-card > .n-card-header .n-card-header__main {
  color: white !important;
}
</style>

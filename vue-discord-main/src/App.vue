<script>
import { NMessageProvider } from "naive-ui";

export default {
  components: { NMessageProvider },
};
</script>

<template>
  <n-message-provider>
    <RouterView />
  </n-message-provider>
</template>

<style scoped></style>

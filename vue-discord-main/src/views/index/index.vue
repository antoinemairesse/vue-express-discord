<template>
  <div class="w-screen max-w-screen h-screen flex">
    <ServerBar class="w-[72px] min-w-[72px] h-full bg-gray_900" />
    <Channels class="w-[270px] min-w-[270px] h-full bg-gray_700" />
    <Chat class="w-[calc(100%_-_612px)]" />
    <Members class="w-[270px] min-w-[270px] h-full bg-gray_700" />
  </div>
</template>

<script>
import ServerBar from "./ServerBar/index.vue";
import Channels from "./Channels/index.vue";
import Chat from "./Chat/index.vue";
import Members from "./Members/index.vue";
import { mapActions } from "vuex";

export default {
  name: "index",
  components: { Members, Chat, Channels, ServerBar },
  methods: {
    ...mapActions("auth", ["getAuthUser"]),
  },
  mounted() {
    this.getAuthUser();
  },
};
</script>

<style scoped></style>

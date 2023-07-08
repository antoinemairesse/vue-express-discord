<template>
  <div
    class="channel-wrapper group"
    :class="{
      '!bg-light_gray_300':
        selectedChannel && channel._id === selectedChannel._id,
    }"
  >
    <div class="overflow-hidden flex items-center gap-1">
      <i class="ri-hashtag text-xl"></i>
      <span
        :class="{
          'text-white_500':
            selectedChannel && channel._id === selectedChannel._id,
        }"
        class="truncate group-hover:text-white_500"
      >
        {{ channel.name }}
      </span>
    </div>
    <ChannelActions
      @update="$emit('update')"
      @delete="$emit('delete')"
      :channel="channel"
    />
  </div>
</template>

<script>
import ChannelActions from "./ChannelActions.vue";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Channel",
  components: { ChannelActions },
  emits: ["update", "delete"],
  computed: {
    ...mapState("channel", ["selectedChannel"]),
    ...mapState("auth", ["user"]),
    ...mapGetters("user", ["users"]),
    ...mapState("server", ["selectedServer"]),
  },
  props: {
    channel: null,
  },
};
</script>

<style scoped>
.channel-wrapper {
  @apply truncate flex gap-1 justify-between items-center text-gray_500 rounded cursor-pointer text-font_15 mb-0.5 px-2 py-1 hover:bg-light_gray_400;
}
</style>

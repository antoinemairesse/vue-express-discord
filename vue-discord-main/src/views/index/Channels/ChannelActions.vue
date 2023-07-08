<template>
  <div class="flex gap-1">
    <n-tooltip
      v-if="permissions?.deleteChannels || channel.creator === user?._id"
      trigger="hover"
      placement="top"
      :duration="0"
    >
      <template #trigger>
        <i
          :class="{
            '!block': selectedChannel && channel._id === selectedChannel._id,
          }"
          class="group-hover:block hidden hover:text-white_500 ri-delete-bin-2-line"
          @click.stop="$emit('delete')"
        />
      </template>
      {{ $t("channel.delete") }}
    </n-tooltip>
    <n-tooltip
      v-if="permissions?.editChannels || channel.creator === user?._id"
      trigger="hover"
      placement="top"
      :duration="0"
    >
      <template #trigger>
        <i
          :class="{
            '!block': selectedChannel && channel._id === selectedChannel._id,
          }"
          class="group-hover:block hidden hover:text-white_500 ri-settings-4-line"
          @click.stop="$emit('update')"
        />
      </template>
      {{ $t("channel.edit") }}
    </n-tooltip>
  </div>
</template>

<script>
import { NTooltip } from "naive-ui";
import { mapGetters, mapState } from "vuex";

export default {
  name: "ChannelActions",
  components: { NTooltip },
  emits: ["update", "delete"],
  props: {
    channel: null,
  },
  computed: {
    ...mapGetters("auth", ["permissions"]),
    ...mapState("channel", ["selectedChannel"]),
    ...mapState("auth", ["user"]),
  },
};
</script>

<style scoped></style>

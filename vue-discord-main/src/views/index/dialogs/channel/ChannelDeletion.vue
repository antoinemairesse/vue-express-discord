<template>
  <DialogWrapper
    :title="$tc('channel.delete', 2, { name: channel?.name })"
    v-model="show"
  >
    <div class="mb-4 text-white_500 text-base">
      {{ $tc("channel.delete_confirm", 2, { name: channel?.name }) }}
    </div>
    <div class="flex gap-4 justify-end items-center">
      <button class="text-white_500" @click="show = false">
        {{ $t("cancel") }}
      </button>
      <button
        @click="_delete"
        class="bg-red-500 text-white_500 rounded px-3 py-2.5"
      >
        {{ $t("channel.delete") }}
      </button>
    </div>
  </DialogWrapper>
</template>

<script>
import { useMessage } from "naive-ui";
import { ErrorMessage, Field, Form } from "vee-validate";
import DialogWrapper from "../../../../components/dialogWrapper.vue";
import errorMessage from "@/mixins/errorMessage";

export default {
  name: "ChannelDeletion",
  mixins: [errorMessage],
  components: { DialogWrapper, Form, Field, ErrorMessage },
  data() {
    return {
      message: useMessage(),
      channel: null,
      show: false,
    };
  },
  methods: {
    toggle(channel) {
      this.channel = channel;
      this.show = !this.show;
    },
    _delete() {
      this.$api.channel
        .delete(this.channel?._id)
        .catch((e) => this.errorMessage(e, "channel.delete_error"))
        .finally(() => (this.show = false));
    },
  },
};
</script>

<style scoped></style>

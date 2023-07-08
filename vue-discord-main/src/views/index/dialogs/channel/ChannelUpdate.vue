<template>
  <DialogWrapper
    :title="$tc('channel.edit', 2, { name: channel?.name })"
    v-model="show"
  >
    <Form @submit="update" class="flex flex-col" :validation-schema="schema">
      <div class="flex flex-col mb-5">
        <h5 class="input-label">{{ $t("form.labels.channel_name") }}</h5>
        <Field class="text-input" name="name" :value="channel?.name" />
        <ErrorMessage class="error-msg" name="name" />
      </div>
      <div class="flex gap-4 justify-end items-center">
        <button type="button" class="text-white_500" @click="show = false">
          {{ $t("cancel") }}
        </button>
        <button class="bg-purple text-white_500 rounded px-3 py-2.5">
          {{ $t("channel.edit") }}
        </button>
      </div>
    </Form>
  </DialogWrapper>
</template>

<script>
import { useMessage } from "naive-ui";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import DialogWrapper from "../../../../components/dialogWrapper.vue";
import errorMessage from "@/mixins/errorMessage";

export default {
  name: "ChannelUpdate",
  mixins: [errorMessage],
  components: { DialogWrapper, Form, Field, ErrorMessage },
  data() {
    const schema = yup.object({
      name: yup.string().required().min(3).max(30),
    });

    return {
      message: useMessage(),
      channel: null,
      show: false,
      schema,
    };
  },
  methods: {
    toggle(channel) {
      this.channel = channel;
      this.show = !this.show;
    },
    update(data) {
      this.$api.channel
        .update(this.channel?._id, data)
        .catch((e) => this.errorMessage(e, "channel.edit_error"))
        .finally(() => (this.show = false));
    },
  },
};
</script>

<style scoped></style>

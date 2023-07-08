<template>
  <DialogWrapper
    :title="$tc('server.delete', 2, { name: server?.name })"
    v-model="show"
  >
    <div class="mb-4 text-white_500 text-base">
      {{ $tc("server.delete_confirm", 2, { name: server?.name }) }}
    </div>
    <Form @submit="_delete" :validation-schema="schema">
      <div class="flex flex-col mb-5">
        <h5 class="input-label">{{ $t("form.labels.enter_server_name") }}</h5>
        <Field class="text-input" name="name" v-model="nameConfirmation" />
        <ErrorMessage class="error-msg" name="name" />
      </div>
      <div class="flex gap-4 justify-end items-center">
        <button type="button" class="text-white_500" @click="show = false">
          {{ $t("cancel") }}
        </button>
        <button
          type="submit"
          class="bg-red-500 text-white_500 rounded px-3 py-2.5"
        >
          {{ $t("server.delete") }}
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
import Server from "@/api/server";
import errorMessage from "@/mixins/errorMessage";

export default {
  name: "ServerDeletion",
  mixins: [errorMessage],
  components: { DialogWrapper, Form, Field, ErrorMessage },
  data() {
    return {
      schema: null,
      message: useMessage(),
      nameConfirmation: "",
      server: null,
      show: false,
    };
  },
  methods: {
    toggle(server) {
      this.server = server;
      this.schema = yup.object({
        name: yup
          .string()
          .required()
          .oneOf([server?.name], this.$t("server.name_confirm_error")),
      });
      this.show = !this.show;
    },
    _delete() {
      Server.delete(this.server?._id)
        .catch((e) => this.errorMessage(e, "server.delete_error"))
        .finally(() => (this.show = false));
    },
  },
};
</script>

<style scoped></style>

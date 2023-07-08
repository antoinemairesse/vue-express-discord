<template>
  <DialogWrapper
    :title="$tc('server.edit', 2, { name: server?.name })"
    v-model="show"
  >
    <Form @submit="update" class="flex flex-col" :validation-schema="schema">
      <ImageUpload v-model="image" :url="imageURL" />

      <div class="flex flex-col mb-5">
        <h5 class="input-label">{{ $t("form.labels.server_name") }}</h5>
        <Field class="text-input" name="name" :value="server?.name" />
        <ErrorMessage class="error-msg" name="name" />
      </div>

      <div class="flex gap-4 justify-end items-center">
        <button type="button" class="text-white_500" @click="show = false">
          {{ $t("cancel") }}
        </button>
        <button class="bg-purple text-white_500 rounded px-3 py-2.5">
          {{ $t("server.edit") }}
        </button>
      </div>
    </Form>
  </DialogWrapper>
</template>

<script>
import { useMessage } from "naive-ui";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import ImageUpload from "../../../../components/imageUpload.vue";
import DialogWrapper from "../../../../components/dialogWrapper.vue";
import Server from "@/api/server";
import errorMessage from "@/mixins/errorMessage";

export default {
  name: "ServerUpdate",
  mixins: [errorMessage],
  components: { DialogWrapper, ImageUpload, Form, Field, ErrorMessage },
  data() {
    const schema = yup.object({
      name: yup.string().min(3).max(30),
    });

    return {
      message: useMessage(),
      server: null,
      imageURL: null,
      image: null,
      show: false,
      schema,
    };
  },
  methods: {
    reset() {
      this.show = false;
      this.imageURL = null;
      this.image = null;
    },
    toggle(server) {
      this.server = server;
      this.imageURL = server.photoURL;
      this.show = !this.show;
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.image = files[0];
      this.imageURL = URL.createObjectURL(files[0]);
    },
    async update(data) {
      const fd = new FormData();

      if (this.image) fd.append("image", this.image);

      for (const [key, value] of Object.entries(data)) {
        fd.append(key, value);
      }

      Server.update(this.server?._id, fd)
        .catch((e) => this.errorMessage(e, "server.edit_error"))
        .finally(() => this.reset());
    },
  },
};
</script>

<style scoped></style>

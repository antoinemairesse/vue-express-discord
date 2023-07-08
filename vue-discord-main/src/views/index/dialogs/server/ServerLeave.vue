<template>
  <DialogWrapper
    :title="$tc('server.leave', 2, { name: server?.name })"
    v-model="show"
  >
    <div class="mb-4 text-white_500 text-base">
      {{ $tc("server.leave_confirm", 2, { name: server?.name }) }}
    </div>
    <div class="flex gap-4 justify-end items-center">
      <button class="text-white_500" @click="show = false">
        {{ $t("cancel") }}
      </button>
      <button
        @click="leave"
        class="bg-red-500 text-white_500 rounded px-3 py-2.5"
      >
        {{ $t("server.leave") }}
      </button>
    </div>
  </DialogWrapper>
</template>

<script>
import { useMessage } from "naive-ui";
import { ErrorMessage, Field, Form } from "vee-validate";
import DialogWrapper from "../../../../components/dialogWrapper.vue";
import { mapActions } from "vuex";
import errorMessage from "@/mixins/errorMessage";

export default {
  name: "ServerLeave",
  mixins: [errorMessage],
  components: { DialogWrapper, Form, Field, ErrorMessage },
  data() {
    return {
      message: useMessage(),
      server: null,
      show: false,
    };
  },
  methods: {
    ...mapActions("server", ["deleteServer"]),
    toggle(server) {
      this.server = server;
      this.show = !this.show;
    },
    leave() {
      this.$api.servers
        .leave(this.server?._id)
        .then(() => this.deleteServer(this.server?._id))
        .catch((e) => this.errorMessage(e, "server.leave_error"))
        .finally(() => (this.show = false));
    },
  },
};
</script>

<style scoped></style>

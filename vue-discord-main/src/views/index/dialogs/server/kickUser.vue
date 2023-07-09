<template>
  <DialogWrapper
    :title="$tc('server.kick', 2, { username: user?.username })"
    v-model="show"
  >
    <div class="mb-4 text-white_500 text-base">
      {{ $tc("server.kick_confirm", 2, { username: user?.username }) }}
    </div>
    <div class="flex gap-4 justify-end items-center">
      <button type="button" class="text-white_500" @click="show = false">
        {{ $t("cancel") }}
      </button>
      <button
        type="submit"
        class="bg-red-500 text-white_500 rounded px-6 py-2.5"
        @click="kick"
      >
        {{ $t("kick") }}
      </button>
    </div>
  </DialogWrapper>
</template>

<script>
import { useMessage } from "naive-ui";
import { ErrorMessage, Field, Form } from "vee-validate";
import { mapState } from "vuex";
import DialogWrapper from "../../../../components/dialogWrapper.vue";

export default {
  name: "kickUser",
  components: { DialogWrapper, Form, Field, ErrorMessage },
  data() {
    return {
      schema: null,
      message: useMessage(),
      nameConfirmation: "",
      user: null,
      show: false,
    };
  },
  computed: {
    ...mapState("servers", ["selectedServer"]),
  },
  methods: {
    toggle(user) {
      this.user = user;
      this.show = !this.show;
    },
    kick() {
      this.$api.servers
        .kick(this.selectedServer?._id, this.user?._id)
        .finally(() => (this.show = false));
    },
  },
};
</script>

<style scoped></style>

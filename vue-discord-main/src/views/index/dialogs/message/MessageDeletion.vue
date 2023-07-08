<template>
  <DialogWrapper :title="$t('message.delete')" v-model="show">
    <div class="mb-4 text-white_500 text-base">
      {{ $t("message.delete_confirm") }}
    </div>

    <div
      class="flex gap-3 w-full mb-5 border-[1px] p-2 rounded border-dark/[0.5] shadow-lg"
    >
      <div
        class="w-10 h-10 mt-1 rounded-full bg-cover bg-center flex-shrink-0"
        :style="{ 'background-image': userPhotoURL(user) }"
      />
      <div class="flex flex-col w-full">
        <div class="flex gap-1 items-center">
          <span class="text-white_500 font-bold">{{ user.username }}</span>
          <span class="text-label text-xs">{{
            moment(msg.createdAt).calendar()
          }}</span>
        </div>

        <span class="text-white_500">
          {{ msg.content }}
          <span v-if="!!msg.updatedAt" class="text-[0.65rem] text-label">
            ({{ $t("message.modified") }})
          </span>
          <img
            v-if="msg.attachment"
            class="block w-auto h-auto max-w-[300px] max-h-[300px] my-2"
            :src="msg.attachment"
            alt=""
          />
        </span>
      </div>
    </div>

    <div class="flex gap-4 justify-end items-center">
      <button class="text-white_500" @click="show = false">
        {{ $t("cancel") }}
      </button>
      <button
        @click="_delete"
        class="bg-red-500 text-white_500 rounded px-3 py-2.5"
      >
        {{ $t("message.delete") }}
      </button>
    </div>
  </DialogWrapper>
</template>

<script>
import { useMessage } from "naive-ui";
import { ErrorMessage, Field, Form } from "vee-validate";
import moment from "moment";
import DialogWrapper from "../../../../components/dialogWrapper.vue";
import Message from "@/api/messages";
import userPhotoURL from "@/mixins/userPhotoURL";
import errorMessage from "@/mixins/errorMessage";

export default {
  name: "MessageDeletion",
  mixins: [userPhotoURL, errorMessage],
  components: { DialogWrapper, Form, Field, ErrorMessage },
  data() {
    return {
      moment: moment,
      message: useMessage(),
      msg: null,
      show: false,
      user: "",
    };
  },
  methods: {
    toggle(msg, user) {
      this.msg = msg;
      this.user = user;
      this.show = !this.show;
    },
    _delete() {
      Message.delete(this.msg?._id)
        .catch((e) => this.errorMessage(e, "message.delete_error"))
        .finally(() => (this.show = false));
    },
  },
};
</script>

<style scoped></style>

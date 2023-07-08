<template>
  <div
    class="flex mb-5 relative group justify-between px-5 hover:bg-gray_700/[0.75]"
  >
    <n-modal
      class="max-h-[90vh] max-w-[90vw]"
      v-model:show="showAttachmentPreview"
    >
      <img
        v-if="message.attachment"
        class="mx-auto block my-2"
        :src="message.attachment"
        :alt="message.content"
        @click="previewAttachment(message.attachment)"
      />
    </n-modal>
    <div class="flex gap-3 w-full">
      <div
        class="w-10 h-10 mt-1 rounded-full bg-cover bg-center flex-shrink-0"
        :style="{ 'background-image': userPhotoURL(sender) }"
      />

      <div class="flex flex-col w-full">
        <div class="flex gap-1 items-center">
          <span
            class="text-white_500 text-[0.9rem] font-semibold"
            :style="`color: ${sender?.role?.color}`"
            >{{ sender?.username }}</span
          >
          <span class="text-label text-xs">{{
            moment(message.createdAt).calendar()
          }}</span>
        </div>

        <div v-if="!editMode" class="text-white_500">
          {{ message.content }}
          <span v-if="!!message.updatedAt" class="text-[0.65rem] text-label">
            ({{ $t("message.modified") }})
          </span>
          <img
            v-if="message.attachment"
            class="block w-auto h-auto max-w-[300px] max-h-[300px] my-2 cursor-pointer"
            :src="message.attachment"
            :alt="message.content"
            @click="previewAttachment"
          />
        </div>

        <EditForm ref="editForm" :message="message" />
      </div>
    </div>

    <div
      class="hidden group-hover:block text-xl text-label bg-gray_600 h-fit border-[1px] rounded border-dark/[0.5] right-[1rem] absolute top-[-12px]"
    >
      <i
        v-if="message.sender === user?._id"
        class="ri-pencil-fill action-btn"
        @click="editMessage"
      />
      <i
        v-if="permissions?.deleteMessages || message.sender === user?._id"
        class="ri-delete-bin-2-line action-btn"
        @click="
          $emit('delete');
          $refs.editForm.cancelEdit();
        "
      />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapGetters, mapState } from "vuex";
import userPhotoURL from "../../../mixins/userPhotoURL";
import EditForm from "./editForm.vue";
import { NModal } from "naive-ui";

export default {
  name: "Message",
  components: { EditForm, NModal },
  emits: ["delete"],
  mixins: [userPhotoURL],
  props: {
    message: null,
    sender: null,
  },
  data() {
    return {
      moment,
      showAttachmentPreview: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["permissions"]),
    ...mapState("messages", ["editMessageId"]),
    ...mapState("auth", ["user"]),
    editMode() {
      return this.message._id === this.editMessageId;
    },
  },
  methods: {
    ...mapActions("messages", ["setEditMessageId"]),
    editMessage() {
      this.setEditMessageId(this.message._id);
    },
    previewAttachment() {
      this.showAttachmentPreview = true;
    },
  },
};
</script>

<style scoped>
.action-btn {
  @apply cursor-pointer hover:text-white_500 hover:bg-gray_400 transition-all px-1.5 py-1.5 rounded;
}
</style>

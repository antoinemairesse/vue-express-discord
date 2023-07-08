<template>
  <upload-screen v-model:image="image" />
  <div class="flex gap-x-2 w-[95%] mx-auto pb-4">
    <div v-if="image" class="px-3 py-3 relative bg-gray_800 rounded">
      <i
        class="ri-delete-bin-2-line absolute top-0 right-0 px-1.5 py-1 cursor-pointer text-white_500 bg-red-500 rounded"
        @click="deleteImage(image)"
      />
      <img
        :src="image"
        class="w-auto h-auto max-h-[100px] max-w-[100px] block"
        alt=""
      />
    </div>
  </div>
  <Form
    v-loading="messageLoading"
    class="w-full flex flex-col items-center"
    @submit="send"
  >
    <div
      v-if="typingString"
      class="w-[95%] text-white_500 rounded px-2 py-1 loading"
    >
      {{ typingString }}
    </div>
    <input
      v-model="message"
      type="text"
      class="bg-light_gray_300 w-[95%] py-3 mb-5 px-5 rounded-xl text-white_500 outline-0"
      :placeholder="$tc('message.send', { channel: channelName })"
      @input="debounceInput"
    />
  </Form>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { Form } from "vee-validate";
import UploadScreen from "./uploadScreen.vue";

export default {
  name: "chatInput",
  inject: ["$socket"],
  components: { UploadScreen, Form },
  computed: {
    ...mapGetters("channel", ["channelName", "usersTyping"]),
    ...mapState("message", { messageLoading: "loading" }),
    typingString() {
      if (!this.usersTyping || !this.usersTyping.length) return null;

      const usernames = this.usersTyping.map((u) => u.username);
      return this.$tc("chat.typing", usernames.length - 1, {
        user: usernames[0],
        ...(usernames.length >= 2 && { user2: usernames[1] }),
        ...(usernames.length > 2 && { more: usernames.length - 2 }),
      });
    },
  },
  data() {
    return {
      debounceTime: 500,
      typing: false,
      image: null,
      message: null,
      timer: null,
    };
  },
  methods: {
    ...mapActions("message", ["sendMessage"]),
    ...mapActions("channel", ["sendTyping"]),
    deleteImage() {
      this.image = null;
    },
    send() {
      const message = this.message;
      if ((!message || message.length < 1) && !this.image) return;

      this.sendMessage({ message, image: this.image }).then(() => {
        this.message = null;
        this.deleteImage();
      });
    },
    debounceInput() {
      if (!this.typing) {
        this.typing = true;
        this.sendTyping(true);
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.stopTyping(), this.debounceTime);
    },
    stopTyping() {
      this.typing = false;
      this.sendTyping(false);
    },
  },
};
</script>

<style scoped>
.loading:after {
  overflow: hidden;
  display: inline-block;
  vertical-align: bottom;
  -webkit-animation: ellipsis steps(4, end) 900ms infinite;
  animation: ellipsis steps(4, end) 900ms infinite;
  content: "\2026"; /* ascii code for the ellipsis character */
  width: 0px;
}

@keyframes ellipsis {
  to {
    width: 1.25em;
  }
}

@-webkit-keyframes ellipsis {
  to {
    width: 1.25em;
  }
}
</style>

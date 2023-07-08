<template>
  <div class="h-screen">
    <div
      v-if="selectedChannel"
      class="bg-gray_600 h-full flex flex-col justify-between"
    >
      <!-- MODALS -->
      <MessageDeletion ref="messageDeletion" />

      <div
        class="w-full text-white_500 font-bold text-font_15 py-3 border-b-[1px] border-gray_900"
      >
        <div class="pl-5 flex items-center gap-1">
          <i class="text-xl ri-hashtag" />
          <span class="truncate max-w-[90%]">{{ channelName }}</span>
        </div>
      </div>

      <div
        @scroll="onChatScroll"
        id="chat-box"
        class="h-full w-full py-5 custom-scrollbar overflow-y-scroll flex flex-col-reverse"
      >
        <div
          v-for="message in messages"
          :key="$i18n.locale + message[0]"
          class="text-white_500"
        >
          <n-divider class="text-label !mt-0 text-xs">
            {{ moment(message[0]).format("D MMMM YYYY") }}
          </n-divider>
          <Message
            v-for="msg in message[1]"
            :message="msg"
            :sender="getSender(msg.sender)"
            @delete="$refs.messageDeletion.toggle(msg, getSender(msg.sender))"
          />
        </div>

        <div v-if="page < pageCount" id="loading-messages">
          <div v-for="n in 5">
            <div class="px-5 mb-5">
              <div
                class="animate-pulse flex gap-3 w-full items-center align-middle"
              >
                <div
                  class="bg-gray_400 w-10 h-10 mt-1 rounded-full bg-cover bg-center flex-shrink-0"
                />

                <div class="flex flex-col w-full">
                  <div class="flex gap-1 items-center">
                    <div
                      class="bg-gray_200 h-3 rounded"
                      :style="{
                        width: `${Math.ceil(Math.random() * 150) + 100}px`,
                      }"
                    />
                    <div class="bg-gray_200 h-3 w-[75px] rounded" />
                  </div>
                  <div
                    v-for="n in Math.ceil(Math.random() + 1)"
                    class="bg-gray_400 h-3 w-[75px] mt-2 rounded"
                    :style="{
                      width: `${Math.ceil(Math.random() * 350) + 100}px`,
                    }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatInput />
    </div>

    <div
      v-else
      class="bg-gray_900 h-full flex flex-col items-center justify-center"
    >
      <img class="mb-5" src="/src/assets/no-channel.svg" alt="" />
      <h1 class="text-label/[0.8] uppercase text-lg font-bold text-center">
        {{ $t("channel.none") }}
      </h1>
      <p class="text-label/[0.8] text-sm max-w-md text-center">
        {{ $t("channel.none_text") }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Message from "../Message/index.vue";
import MessageDeletion from "../dialogs/message/MessageDeletion.vue";
import moment from "moment";
import { NDivider } from "naive-ui";
import ChatInput from "./chatInput.vue";
import _ from "lodash";

export default {
  name: "Chat",
  components: { ChatInput, MessageDeletion, Message, NDivider },
  computed: {
    ...mapGetters("users", ["users"]),
    ...mapGetters("channels", ["channelName"]),
    ...mapGetters("messages", ["messages"]),
    ...mapState("channels", ["selectedChannel"]),
    ...mapState("messages", ["page", "pageCount", "loading"]),
  },
  data() {
    return {
      moment: moment,
    };
  },
  methods: {
    ...mapActions("messages", ["getMoreMessages"]),
    isScrolledIntoView(el) {
      let rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom >= 0;
    },
    onChatScroll() {
      const chatBox = document.getElementById("chat-box");
      const loading = document.getElementById("loading-messages");
      const scroll = chatBox.scrollTop;

      if (
        this.page < this.pageCount &&
        !this.loading &&
        this.isScrolledIntoView(loading)
      ) {
        this.getMoreMessages().then(() => {
          chatBox.scrollTop = scroll;
        });
      }
    },
    getSender(sender) {
      return this.users?.find((user) => {
        return user._id === sender;
      });
    },
  },
};
</script>

<style>
.n-divider:not(.n-divider--dashed) .n-divider__line {
  background-color: #42464e !important;
}
</style>

<style scoped></style>

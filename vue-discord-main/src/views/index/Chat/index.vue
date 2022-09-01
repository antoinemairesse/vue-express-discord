<template>
  <div class="h-screen">
    <div v-if="selectedChannel" class="bg-gray_600 h-full flex flex-col justify-between">
      <!-- MODALS -->
      <MessageDeletion ref="messageDeletion"/>

      <div class="w-full text-white_500 font-bold text-font_15 py-3 border-b-[1px] border-gray_900">
        <div class="pl-5 flex items-center gap-1">
          <i class="text-xl ri-hashtag"/>
          <span class="truncate max-w-[90%]">{{ channelName }}</span>
        </div>
      </div>

      <div class="h-full w-full py-5 custom-scrollbar overflow-y-scroll flex flex-col-reverse">
        <div v-for="message in messages" :key="$i18n.locale + message[0]" class="text-white_500">
          <n-divider class="text-label !mt-0 text-xs">
            {{ moment(message[0]).format('D MMMM YYYY') }}
          </n-divider>
          <Message
              v-for="msg in message[1]"
              :message="msg"
              :sender="getSender(msg.sender)"
              @delete="$refs.messageDeletion.toggle(msg, getSender(msg.sender))"
          />
        </div>
      </div>
      <ChatInput/>
    </div>

    <div v-else class="bg-gray_900 h-full flex flex-col items-center justify-center">
      <img class="mb-5" src="/src/assets/no-channel.svg" alt="">
      <h1 class="text-label/[0.8] uppercase text-lg font-bold text-center">{{ $t('channel.none') }}</h1>
      <p class="text-label/[0.8] text-sm max-w-md text-center">{{ $t('channel.none_text') }}</p>
    </div>

  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import Message from '../Message/index.vue';
import MessageDeletion from '../dialogs/message/MessageDeletion.vue';
import moment from "moment";
import {NDivider} from 'naive-ui'
import ChatInput from "./chatInput.vue";

export default {
  name: 'Chat',
  components: {ChatInput, MessageDeletion, Message, NDivider},
  computed: {
    ...mapGetters('user', ['users']),
    ...mapGetters('channel', ['channelName']),
    ...mapGetters('message', ['messages']),
    ...mapState('channel', ['selectedChannel']),
  },
  data() {
    return {
      moment: moment
    };
  },
  methods: {
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
  background-color: #42464E !important;
}
</style>

<style scoped>
</style>

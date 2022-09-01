<template>
  <Form @submit="send" class="w-full flex flex-col items-center" :validation-schema="schema">
    <div
        v-if="usersTyping && usersTyping.length >= 1 && usersTyping[0] !== user._id"
        class="w-[95%] text-white_500 rounded px-2 py-1 loading"
    >
      {{typingString}}
    </div>
    <Field
        name="message"
        ref="chatbar"
        class="bg-light_gray_300 w-[95%] py-3 mb-5 px-5 rounded-xl text-white_500 outline-0"
        :placeholder="$tc('message.send', {channel: channelName})"
        @input="debounceInput"
    />
  </Form>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import * as yup from "yup";
import {Field, Form} from 'vee-validate';

export default {
  name: "chatInput",
  inject: ['$socket'],
  components: {Field, Form},
  computed: {
    ...mapGetters('user', ['users']),
    ...mapState('server', ['selectedServer']),
    ...mapState('channel', ['selectedChannel']),
    ...mapGetters('channel', ['channelName', 'usersTyping']),
    ...mapState('auth', ['user']),
    typingString() {
      const usernames = [];

      this.usersTyping?.forEach((userId) => {
        const username = this.users?.find((user) => {
          return (user._id === userId) && userId !== this.user._id;
        })?.username;
        if (username) usernames.push(username);
      });

      if (usernames.length === 2) return `${usernames[0]} ${this.$t('chat.and')} ${usernames[1]} ${this.$t('chat.are_typing')}`;
      else if (usernames.length > 2) return `${usernames[0]} ${usernames[1]} ${this.$t('chat.and')} ${usernames.length - 2} ${this.$t('chat.more_typing')}`;
      else return`${usernames[0]} ${this.$t('chat.is_typing')}`;
    },
  },
  data(){
    const schema = yup.object({
      message: yup.string().required().min(1),
    });
    return {
      schema,
      debounceTime: 500,
      typing: false,
      timer: null
    }
  },
  methods: {
    ...mapActions('message', ['sendMessage']),
    send(data) {
      this.$refs.chatbar.reset();
      this.sendMessage(data.message);
      this.stopTyping()
    },
    debounceInput() {
      if (!this.typing) {
        this.typing = true;
        this.$socket.emit('typing', {serverId: this.selectedServer?._id, channelId: this.selectedChannel?._id});
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.stopTyping(), this.debounceTime);
    },
    stopTyping(){
      this.typing = false;
      this.$socket.emit('stopTyping', {serverId: this.selectedServer?._id, channelId: this.selectedChannel?._id});
    }
  }
}
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
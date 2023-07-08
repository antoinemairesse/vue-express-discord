<template>
  <div class="w-screen max-w-screen h-screen flex">
    <n-message-provider>
      <ServerBar class="w-[72px] min-w-[72px] h-full bg-gray_900"/>
      <Channels class="w-[270px] min-w-[270px] h-full bg-gray_700"/>
      <Chat class="w-[calc(100%_-_612px)]"/>
      <Members class="w-[270px] min-w-[270px] h-full bg-gray_700"/>
    </n-message-provider>
  </div>
</template>

<script>
import ServerBar from './ServerBar/index.vue';
import Channel from './Channels/index.vue';
import Chat from './Chat/index.vue';
import Members from './Members/index.vue';
import {NMessageProvider} from 'naive-ui';
import {mapActions} from "vuex";

export default {
  name: 'index',
  components: {Members, Chat, Channel, ServerBar, NMessageProvider},
  methods: {
    ...mapActions('auth', ['getAuthUser'])
  },
  mounted() {
    this.getAuthUser();
  },
};
</script>

<style scoped>

</style>

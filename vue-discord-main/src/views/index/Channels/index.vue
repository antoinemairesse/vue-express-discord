<template>
  <div class="h-screen flex flex-col justify-between">
    <!-- MODALS -->
    <ChannelCreation ref="channelCreation" />
    <ChannelUpdate ref="channelUpdate" />
    <ChannelDeletion ref="channelDeletion" />
    <div
      class="w-full text-white_500 flex items-center justify-between px-5 font-bold text-font_15 py-3 border-b-[1px] border-gray_900"
    >
      <div class="truncate">{{ serverName }}</div>
      <n-tooltip
        v-if="
          permissions?.createChannels ||
          (selectedServer && user && selectedServer?.creator === user?._id)
        "
        trigger="hover"
        placement="top"
        :duration="0"
      >
        <template #trigger>
          <button @click="$refs.channelCreation.toggle()">
            <i class="ri-add-line text-xl"></i>
          </button>
        </template>
        {{ $t("channel.add") }}
      </n-tooltip>
    </div>

    <div v-if="channels" class="h-full custom-scrollbar overflow-y-scroll">
      <n-collapse
        class="w-[85%] mx-auto select-none mt-4"
        default-expanded-names="1"
      >
        <n-collapse-item :title="$t('channel.type.text')" name="1">
          <div v-for="channel in channels" @click="setSelectedChannel(channel)">
            <Channel
              :channel="channel"
              @update="$refs.channelUpdate.toggle(channel)"
              @delete="$refs.channelDeletion.toggle(channel)"
            />
          </div>
        </n-collapse-item>
      </n-collapse>
    </div>

    <UserControls />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { NCollapse, NCollapseItem, NTooltip } from "naive-ui";
import ChannelCreation from "../dialogs/channel/ChannelCreation.vue";
import ChannelUpdate from "../dialogs/channel/ChannelUpdate.vue";
import ChannelDeletion from "../dialogs/channel/ChannelDeletion.vue";
import Channel from "./Channel.vue";
import UserControls from "./userControls.vue";

export default {
  name: "Channels",
  components: {
    UserControls,
    Channel,
    ChannelDeletion,
    ChannelUpdate,
    ChannelCreation,
    NCollapse,
    NCollapseItem,
    NTooltip,
  },
  computed: {
    ...mapGetters("auth", ["permissions"]),
    ...mapGetters("server", ["serverName"]),
    ...mapGetters("channel", ["channels"]),
    ...mapState("channel", ["selectedChannel"]),
    ...mapState("server", ["selectedServer"]),
    ...mapState("auth", ["user"]),
  },
  methods: {
    ...mapActions("channel", ["setSelectedChannel"])
  },
};
</script>

<style>
.info-bar-icons {
  @apply cursor-pointer text-label hover:text-white_500 hover:bg-gray_400 transition-all px-1.5 rounded;
}

.n-collapse
  .n-collapse-item
  .n-collapse-item__header
  .n-collapse-item__header-main {
  color: #96989d !important;
  font-weight: 700 !important;
  text-transform: uppercase;
}

.n-collapse
  .n-collapse-item
  .n-collapse-item__header
  .n-collapse-item__header-main
  > * {
  font-weight: 700 !important;
  color: #96989d !important;
}
</style>

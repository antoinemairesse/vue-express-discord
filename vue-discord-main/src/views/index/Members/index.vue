<template>
  <div class="p-4 custom-scrollbar overflow-y-scroll">

    <!-- MODALS -->
    <KickUser ref="kickUser"/>
    <BanUser ref="banUser"/>

    <ContextMenu
        v-model:item="contextMenuItem"
        :items="contextMenuItems"
        :condition="selectedServer?.creator !== contextMenuItem?._id"
        ref="contextMenu"
        @kickUser="(item) => $refs.kickUser.toggle(item)"
        @banUser="(item) => $refs.kickUser.toggle(item)"
    />

    <div v-for="type in ['online', 'offline']">
      <div class="text-gray_500 text-xs font-bold mb-2 uppercase">
        {{ $tc(`status.${type}`, {count: status[type]?.length}) }}
      </div>

      <div
          v-for="user in status[type]"
          :class="{'opacity-50 hover:opacity-100': type === 'offline'}"
          class="flex items-center gap-3 mb-3 cursor-pointer text-gray_500 hover:text-white_500 hover:bg-light_gray_300 py-1 rounded"
          @contextmenu.prevent="$refs.contextMenu.handleContextMenu($event, user)"
      >
        <n-badge v-if="type === 'online'" dot type="success" class="flex-shrink-0">
          <div class="w-9 h-9 rounded-full bg-cover bg-center" :style="{'background-image':userPhotoURL(user)}"/>
        </n-badge>
        <div v-else class="w-9 h-9 rounded-full bg-cover bg-center flex-shrink-0" :style="{'background-image':userPhotoURL(user)}"/>

        <div class="flex flex-col justify-between gap-1 max-w-[100%] flex-shrink-[99] truncate">
          <span :style="`color: ${user.role.color}`" class="text-base truncate">{{ user.username }}</span>
          <span :style="`background-color: ${user.role.color}`" class="text-xs w-fit text-white_500 rounded-xl px-1.5">
            {{user.role.name }}
          </span>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import {NBadge} from 'naive-ui';
import {mapGetters, mapState} from 'vuex';
import userPhotoURL from '../../../mixins/userPhotoURL';
import ContextMenu from "../../../components/ContextMenu.vue";
import KickUser from '../dialogs/server/kickUser.vue';
import BanUser from '../dialogs/server/banUser.vue';

export default {
  name: 'index',
  components: {ContextMenu, NBadge, KickUser, BanUser},
  mixins: [userPhotoURL],
  data() {
    return {
      contextMenuItem: null
    }
  },
  computed: {
    ...mapGetters('auth', ['userWithServerContext', 'permissions']),
    ...mapState('auth', ['user']),
    ...mapState('server', ['selectedServer']),
    ...mapGetters('user', ['users', 'status']),
    contextMenuItems() {
      return [
        {
          key: 'members.context_menu.kick_user',
          warning: true,
          event: 'kickUser',
          condition: (this.permissions?.kickUser && (this.selectedServer?.creator !== this.contextMenuItem?._id))
        },
        {
          key: 'members.context_menu.ban_user',
          warning: true,
          event: 'banUser',
          condition: (this.permissions?.banUser && (this.selectedServer?.creator !== this.contextMenuItem?._id))
        }
      ]
    }
  }
};
</script>

<style>
.n-badge.n-badge--dot .n-badge-sup {
  border: none;
  outline: 3px solid #2E3136;
  height: 10px !important;
  width: 10px !important;
  top: calc(100% - 10px) !important;
  right: 100% !important;
  left: calc(100% - 7px) !important;
  bottom: 0 !important;
}
</style>

<template>
  <DialogWrapper :title="'Invite friends to Server de Antoine'" v-model="show">
    <div v-if="!edit">
      <div class="flex flex-col mb-5">
        <h5 class="input-label">{{ $t('invite.send') }}</h5>
        <div class="flex rounded-md bg-white_500">
          <input type="text" class="rounded-l-md py-2 px-2 w-full outline-0" name="name" v-model="link" readonly/>
          <button
              :class="{'hidden': copied}"
              class="transition-all bg-purple text-white_500 w-fit px-2 w-20 rounded-r-md"
              @click="copy"
          >
            {{ $t('copy') }}
          </button>
          <button
              :class="{'hidden': !copied}"
              class="transition-all bg-green text-white_500 w-fit px-2 w-20 rounded-r-md"
          >
            {{ $t('copied') }}
          </button>
        </div>
        <span class="text-label text-xs mt-2">
              <span
                  v-if="expirationString !== 'Never'">{{ $tc('invite.expires_in', 2, {expiration: expirationString}) }} &nbsp;</span>
              <span v-else>{{ $t('invite.never_expires') }} &nbsp;</span>
              <span class="cursor-pointer text-link" @click="edit = true">{{ $t('invite.edit') }}</span>
        </span>
      </div>
    </div>
    <div v-else>
      <div class="flex flex-col mb-5">
        <h5 class="input-label">{{ $t('invite.expire_after') }}</h5>
        <n-select v-model:value="expire" :options="options"/>
      </div>
      <div class="flex gap-4 justify-end items-center">
        <button type="button" class="text-white_500" @click="show = false">{{ $t('cancel') }}</button>
        <button class="bg-purple text-white_500 rounded px-3 py-2.5" @click="generateNewLink">
          {{ $t('invite.new_link') }}
        </button>
      </div>
    </div>
  </DialogWrapper>
</template>

<script>
import {NSelect, useMessage} from 'naive-ui';
import Invite from '@/api/invite';
import expirations from './expirations.json';
import DialogWrapper from '../../../../components/dialogWrapper.vue';
import errorMessage from "@/mixins/errorMessage";

export default {
  name: 'ServerInvite',
  components: {DialogWrapper, NSelect},
  mixins: [errorMessage],
  data() {
    return {
      options: expirations,
      expire: expirations[0].value,
      message: useMessage(),
      code: '',
      edit: false,
      server: null,
      show: false,
      copied: false,
    };
  },
  computed: {
    link() {
      return `${window.location.origin}/invite?code=${this.code}`;
    },
    expirationString() {
      return expirations.find((exp) => exp.value === this.expire).label;
    },
  },
  methods: {
    toggle(server) {
      this.server = server;
      this.show = !this.show;
      Invite.create({server: server._id, maxAge: this.expire}).then((response) => {
        this.code = response.data.code;
      }).catch((e) => this.errorMessage(e, 'server.invite_error', () => this.show = false))
    },
    copy() {
      navigator.clipboard.writeText(this.link);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 1000);
    },
    generateNewLink() {
      Invite.create({
        server: this.server._id,
        ...((this.expire !== 'never') && {maxAge: this.expire}),
        ...((this.expire === 'never') && {neverExpires: true})
      }).then((response) => {
        this.code = response.data.code;
        this.edit = false;
      }).catch((e) => this.errorMessage(e, 'server.invite_error', (code) => {
        if(code === 403) this.show = false
      }))
    },
  },
};
</script>

<style>
.n-base-selection-label {
  padding: 1.5em 0;
}
</style>

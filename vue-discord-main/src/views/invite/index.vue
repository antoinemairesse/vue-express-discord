<template>
  <div class="w-screen h-screen bg-login flex justify-center items-center">
    <div
      v-if="!invalid && !banned"
      class="bg-gray_600 rounded-xl p-10 w-[600px] flex items-center flex-col"
    >
      <div
        class="rounded-full bg-cover bg-center h-16 w-16"
        :style="{ 'background-image': userPhotoURL(sender) }"
      />
      <span class="text-label mt-2"
        >{{ sender?.username }} invited you to join</span
      >
      <div class="flex items-center gap-2 mt-2">
        <div
          :style="{ 'background-image': serverPhotoURL(server) }"
          class="rounded-full bg-cover bg-center h-10 w-10 flex-shrink-0"
        ></div>
        <span class="text-3xl text-white_500 font-bold text-center">{{
          server?.name
        }}</span>
      </div>
      <span class="text-label text-sm mt-2">{{ members }} members</span>
      <button
        :disabled="loading"
        class="disabled:cursor-not-allowed disabled:opacity-50 bg-purple text-white_500 mt-4 p-2 rounded w-1/2 hover:bg-purple/[0.75]"
        @click="accept"
      >
        Accept Invite
      </button>
    </div>
    <div
      v-else-if="banned"
      class="bg-gray_600 rounded-xl p-10 w-[600px] flex items-center flex-col"
    >
      <img class="mb-5" src="/src/assets/invite-invalid.svg" alt="" />
      <span class="text-3xl text-white_500 font-bold text-center"
        >Banned from server</span
      >
      <div class="flex items-center gap-2 mt-2">
        <div
          :style="{ 'background-image': serverPhotoURL(server) }"
          class="rounded-full bg-cover bg-center h-10 w-10 flex-shrink-0"
        ></div>
        <span class="text-3xl text-white_500 font-bold text-center">{{
          server?.name
        }}</span>
      </div>
      <button
        class="bg-purple text-white_500 mt-4 p-2 rounded w-1/2 hover:bg-purple/[0.75]"
        @click="continueToDiscord"
      >
        Continue to Discord
      </button>
    </div>
    <div
      v-else
      class="bg-gray_600 rounded-xl p-10 w-[600px] flex items-center flex-col"
    >
      <img class="mb-5" src="/src/assets/invite-invalid.svg" alt="" />
      <span class="text-3xl text-white_500 font-bold text-center"
        >Invite Invalid</span
      >
      <span class="text-label mt-2 w-4/5 text-center"
        >This invite may be expired, or you might not have permission to
        join.</span
      >
      <button
        class="bg-purple text-white_500 mt-4 p-2 rounded w-1/2 hover:bg-purple/[0.75]"
        @click="continueToDiscord"
      >
        Continue to Discord
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import photoURL from "@/mixins/photoURL";

export default {
  name: "index",
  mixins: [photoURL],
  data() {
    return {
      code: null,
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapState("invites", [
      "banned",
      "members",
      "server",
      "sender",
      "loading",
      "invalid",
    ]),
  },
  mounted() {
    this.code = this.$route.query.code;
    this.getInvite(this.code);
  },
  methods: {
    ...mapActions("invites", ["acceptInvite", "getInvite"]),
    continueToDiscord() {
      this.$router.push("/");
    },
    accept() {
      this.acceptInvite(this.code).then(() => this.continueToDiscord());
    },
  },
};
</script>

<style scoped></style>

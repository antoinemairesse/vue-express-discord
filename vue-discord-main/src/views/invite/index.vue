<template>
  <div class="w-screen h-screen bg-login flex justify-center items-center">
    <div
      v-if="!invalid && !ban"
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
      v-else-if="ban"
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
import serverPhotoURL from "../../mixins/serverPhotoURL";
import { mapActions, mapState } from "vuex";
import userPhotoURL from "../../mixins/userPhotoURL";

export default {
  name: "index",
  mixins: [serverPhotoURL, userPhotoURL],
  data() {
    return {
      loading: true,
      ban: false,
      code: null,
      invalid: false,
      sender: null,
      server: null,
      members: 0,
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  mounted() {
    this.getAuthUser().then(async () => {
      const code = this.$route.query.code;
      this.code = code;
      let invite = null;

      try {
        invite = (await this.$api.invites.get(code, { userId: this.user._id }))
          .data;
      } catch (e) {
        this.invalid = true;
        return;
      }

      this.sender = invite.sender;
      this.server = invite.server;
      this.members = invite.members;
      this.ban = invite.banned;

      this.loading = false;
    });
  },
  methods: {
    ...mapActions("auth", ["getAuthUser"]),
    continueToDiscord() {
      this.$router.push("/");
    },
    accept() {
      const code = this.code;
      this.$api.invites.accept({ code }).then(() => this.$router.push("/"));
    },
  },
};
</script>

<style scoped></style>

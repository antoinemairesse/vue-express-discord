<template>
  <!-- MODALS -->
  <Settings ref="settings" />

  <div class="w-full text-white_500 font-bold text-font_15 py-2 bg-gray_800">
    <div class="w-[85%] mx-auto flex justify-between">
      <div class="max-w-[80%] flex gap-2 items-center">
        <n-badge dot type="success">
          <div
            class="w-9 h-9 rounded-full bg-cover bg-center"
            :style="{ 'background-image': userPhotoURL(user) }"
          />
        </n-badge>
        <span class="text-xs font-medium truncate">{{ user?.username }}</span>
      </div>
      <div class="flex text-lg items-center">
        <i
          class="ri-settings-5-fill info-bar-icons"
          @click="$refs.settings.toggle()"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { NBadge } from "naive-ui";
import Settings from "../dialogs/settings.vue";
import userPhotoURL from "../../../mixins/userPhotoURL";

export default {
  name: "userControls",
  components: { Settings, NBadge },
  mixins: [userPhotoURL],
  computed: {
    ...mapState("auth", ["user"]),
  },
};
</script>

<style scoped></style>

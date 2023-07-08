<template>
  <div
    v-if="showContextMenu && condition"
    id="member-context-menu"
    class="min-w-[150px] transition-all flex flex-col p-1 z-[9999] bg-dark text-label rounded-lg"
    :style="menuStyle"
  >
    <template v-for="item in items">
      <span
        v-if="item.condition"
        class="p-2 hover:text-white_500 cursor-pointer rounded"
        :class="[
          { 'text-red-500 hover:bg-red-600': item.warning },
          { 'hover:bg-purple': !item.warning },
        ]"
        @click="$emit(item.event, this.item)"
      >
        {{ $t(item.key) }}
      </span>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "ContextMenu",
  props: {
    condition: false,
    item: null,
    items: null,
  },
  data() {
    return {
      showContextMenu: false,
      XPosition: Number,
      YPosition: Number,
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapState("server", ["selectedServer"]),
    menuStyle() {
      return {
        position: "fixed",
        left: `${this.XPosition}px`,
        top: `${this.YPosition}px`,
      };
    },
  },
  methods: {
    handleContextMenu($event, item) {
      if (item._id === this.user._id) return;
      this.$emit("update:item", item);
      this.showContextMenu = true;
      this.YPosition = $event.clientY;

      this.$nextTick(() => {
        if (!document.getElementById("member-context-menu")) return;
        const w = document
          .getElementById("member-context-menu")
          .getBoundingClientRect().width;
        if ($event.clientX + w > window.innerWidth) {
          this.XPosition = window.innerWidth - w;
        } else this.XPosition = $event.clientX;
      });

      const outsideClickListener = () => {
        this.showContextMenu = false;
        this.$emit("update:item", null);
        window.removeEventListener("click", outsideClickListener);
      };

      window.addEventListener("click", outsideClickListener);
    },
  },
};
</script>

<style scoped></style>

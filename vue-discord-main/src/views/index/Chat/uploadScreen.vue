<template>
  <Transition>
    <div
      v-if="showUploadScreen"
      class="absolute flex justify-center items-center w-screen h-screen bg-black z-[9999] bg-opacity-80 left-0"
    >
      <div
        class="bg-blue-600 flex justify-center flex-col rounded py-4 px-8 relative border-dotted border-white_500 border-2"
      >
        <div class="absolute top-[-75px] left-0 translate-x-[25%]">
          <div class="flex">
            <img
              class="-rotate-[25deg] relative left-[25px] top-[10px] opacity-90"
              src="/src/assets/file1.svg"
              alt="File"
            />
            <img class="relative z-50" src="/src/assets/file2.svg" alt="File" />
            <img
              class="rotate-[25deg] relative right-[25px] top-[10px] opacity-90"
              src="/src/assets/file3.svg"
              alt="File"
            />
          </div>
        </div>
        <h1 class="mt-10 font-bold text-white_500 text-2xl text-center">
          Upload to #général
        </h1>
        <h1 class="text-white_500">You can add comments before uploading</h1>
      </div>
    </div>
  </Transition>
</template>

<script>
import mimeTypes from "@/resources/mime_types.json";

export default {
  name: "uploadScreen",
  props: {
    image: null,
  },
  mounted() {
    document.onpaste = this.onPaste;
    document.ondragover = this.onDragOver;
    document.ondragleave = () => {
      clearTimeout(this.dragLeaveTimer);
      this.dragLeaveTimer = setTimeout(() => {
        this.showUploadScreen = false;
      }, 100);
    };
    document.ondrop = this.onDrop;
  },
  data() {
    return {
      showUploadScreen: false,
    };
  },
  methods: {
    async onPaste({ clipboardData }) {
      const type = clipboardData.types[0];
      if (type === "text/plain") return;
      const blob = await clipboardData.files[0];
      this.$emit("update:image", window.URL.createObjectURL(blob));
    },
    onDragOver(event) {
      clearTimeout(this.dragLeaveTimer);
      this.showUploadScreen = true;
      event.stopPropagation();
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
    },
    onDrop(event) {
      event.stopPropagation();
      event.preventDefault();
      this.showUploadScreen = false;
      const fileList = event.dataTransfer.files;
      if (fileList.length >= 1 && mimeTypes.includes(fileList[0].type)) {
        const image = fileList[0];
        this.$emit("update:image", window.URL.createObjectURL(image));
      }
    },
  },
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

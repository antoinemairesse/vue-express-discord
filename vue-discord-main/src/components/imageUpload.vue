<template>
  <label
      for="img-input"
      class="w-1/2 bg-gray_800 px-5 mx-auto py-5 hover:bg-gray_900 group transition-all shadow-2xl rounded cursor-pointer mb-5"
  >
    <div class="w-full h-full rounded-full flex flex-col items-center justify-center">
      <div
          v-if="imageURL"
          :style="{'background-image':'url('+imageURL+')'}"
          class="bg-cover bg-center w-12 h-12 rounded-full"
      />
      <i v-else class="group-hover:text-white_500 text-label ri-image-add-line text-5xl"></i>
      <span class="group-hover:text-white_500 text-label text-center font-bold uppercase pt-4">Upload</span>
    </div>
    <input class="hidden" @change="onFileChange" accept="image/*" id="img-input" type="file">
  </label>
</template>

<script>
export default {
  name: 'imageUpload',
  props: {
    modelValue: null,
    url: '',
  },
  data() {
    return {
      imageURL: this.url,
    };
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.$emit('update:modelValue', files[0]);
      this.imageURL = URL.createObjectURL(files[0]);
    },
  },
};
</script>

<style scoped>

</style>

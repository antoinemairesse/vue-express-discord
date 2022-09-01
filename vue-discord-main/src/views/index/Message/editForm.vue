<template>
  <form v-if="editMode" @submit.stop.prevent="updateMsg" class="w-full flex flex-col justify-center">
    <textarea
    ref="textarea"
    type="submit"
    v-model="editValue"
    name="message"
    rows="1"
    class="resize-none bg-light_gray_300 w-full py-3 px-5 rounded-xl text-white_500 outline-0"
    />
    <span class="text-white_500 text-xs">
      {{ $t('message.edit_escape') }}
      <button type="button" class="text-link lowercase" @click="cancelEdit()">{{ $t('cancel') }}</button> •
      {{ $t('message.edit_enter') }}
      <button type="submit" class="text-link lowercase">{{ $t('save') }}</button>
    </span>
  </form>
</template>

<script>
import {mapActions, mapState} from "vuex";
import Message from '@/api/message';

export default {
  name: "editForm",
  emits: ['cancelEdit'],
  props: {
    message: null
  },
  data(){
    return {
      editValue: this.message.content,
    }
  },
  watch: {
    editMode(newValue) {
      this.editValue = this.message.content;
      if (newValue === true) this.startEdit();
    },
  },
  computed: {
    ...mapState('message', ['editMessageId']),
    editMode() {
      return this.message._id === this.editMessageId;
    },
  },
  methods: {
    ...mapActions('message', ['setEditMessageId']),
    startEdit() {
      this.$nextTick(() => {
        const textarea = this.$refs.textarea;

        // make textarea height fit text (= no scroll)
        const resizeTextArea = () => {
          textarea.style.height = '';
          textarea.style.height = textarea.scrollHeight + 'px';
        };

        resizeTextArea();

        // if escape is pressed, cancel edit
        window.addEventListener('keydown', (e) => {
          if (e.which === 27) this.cancelEdit();
        });

        /*
          if enter is pressed (without the shift key) while textarea is focused, update message
          if enter and shift are pressed, => default behavior of enter in textarea = add newline
        */
        textarea.addEventListener('keydown', (e) => {
          if (e.which === 13 && !e.shiftKey) {
            e.preventDefault();
            this.updateMsg();
          }
        });

        textarea.addEventListener('input', (e) => {
          resizeTextArea();
        });

      });
    },
    cancelEdit() {
      this.setEditMessageId(null);
      this.editValue = this.message.content;
    },
    updateMsg() {
      if (this.editValue.length > 0 && this.editValue !== this.message.content) {
        Message.update(this.message._id, {content: this.editValue})
            .then(() => this.setEditMessageId(null));
      }
    },
  }
}
</script>

<style scoped>

</style>
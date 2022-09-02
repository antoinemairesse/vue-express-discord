<template>
  <DialogWrapper :title="$t('form.buttons.create_channel')" v-model="show">
    <Form @submit="create" class="flex flex-col" :validation-schema="schema">
      <div class="flex flex-col mb-6">
        <h5 class="input-label">{{ $t('form.labels.channel_name') }}</h5>
        <Field ref="channelname" v-model="name" class="text-input" name="name"/>
        <ErrorMessage class="error-msg" name="name"/>
      </div>
      <div class="flex gap-4 justify-end items-center">
        <button type="button" class="text-white_500 hover:underline" @click="show = false">{{ $t('cancel') }}</button>
        <button class="bg-purple text-white_500 rounded px-3 py-2.5 disabled:cursor-not-allowed disabled:opacity-50"
                :disabled="name.length < 3">
          {{ $t('form.buttons.create_channel') }}
        </button>
      </div>
    </Form>
  </DialogWrapper>
</template>

<script>
import {ErrorMessage, Field, Form} from 'vee-validate';
import * as yup from 'yup';
import {mapActions} from 'vuex';
import DialogWrapper from '../../../../components/dialogWrapper.vue';
import {useMessage} from "naive-ui";
import errorMessage from "@/mixins/errorMessage";

export default {
  name: 'ChannelCreation',
  mixins: [errorMessage],
  components: {DialogWrapper, Form, Field, ErrorMessage},
  data() {
    const schema = yup.object({
      name: yup.string().required().min(3).max(30),
    });

    return {
      message: useMessage(),
      show: false,
      name: '',
      schema,
    };
  },
  methods: {
    ...mapActions('channel', ['createChannel']),
    toggle() {
      this.show = !this.show;
    },
    create(data) {
      this.$refs.channelname.reset();
      this.createChannel(data)
          .catch((e) => this.errorMessage(e, 'channel.create_error'))
          .finally(() => this.show = false);
    },
  },
};
</script>

<style scoped>
</style>

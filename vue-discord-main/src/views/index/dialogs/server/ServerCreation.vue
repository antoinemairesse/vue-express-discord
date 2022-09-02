<template>
  <DialogWrapper :title="$t('server.create')" v-model="show">
    <Form @submit="create" class="flex flex-col" :validation-schema="schema">

      <ImageUpload v-model="image"/>

      <div class="flex flex-col mb-6">
        <h5 class="input-label">{{ $t('form.labels.server_name') }}</h5>
        <Field ref="servername" v-model="name" class="text-input" name="name"/>
        <ErrorMessage class="error-msg" name="name"/>
      </div>

      <div class="flex gap-4 justify-end items-center">
        <button type="button" class="text-white_500 hover:underline" @click="show = false">{{ $t('cancel') }}</button>
        <button class="bg-purple text-white_500 rounded px-3 py-2.5 disabled:cursor-not-allowed disabled:opacity-50"
                :disabled="name.length < 3">
          {{ $t('server.create') }}
        </button>
      </div>
    </Form>
  </DialogWrapper>
</template>

<script>
import {ErrorMessage, Field, Form} from 'vee-validate';
import * as yup from 'yup';
import {mapActions} from 'vuex';
import ImageUpload from '../../../../components/imageUpload.vue';
import DialogWrapper from '../../../../components/dialogWrapper.vue';
import {useMessage} from "naive-ui";
import errorMessage from "@/mixins/errorMessage";

export default {
  name: 'ServerCreation',
  mixins: [errorMessage],
  components: {DialogWrapper, ImageUpload, Form, Field, ErrorMessage},
  data() {
    const schema = yup.object({
      name: yup.string().required().min(3).max(30),
    });

    return {
      message: useMessage(),
      image: null,
      show: false,
      name: '',
      schema,
    };
  },
  methods: {
    ...mapActions('server', ['createServer']),
    toggle() {
      this.show = !this.show;
    },
    create(data) {
      const fd = new FormData();
      if (this.image) fd.append('image', this.image);
      for (const [key, value] of Object.entries(data)) {
        fd.append(key, value);
      }

      this.createServer(fd)
          .catch((e) => this.errorMessage(e, 'server.create_error'))
          .finally(() => {
            this.show = false;
            this.$refs.servername.reset();
            this.imageURL = null;
            this.image = null;
          });
    },
  },
};
</script>

<style scoped>
</style>

<template>
  <DialogWrapper :title="$t('settings.update')" v-model="show">
    <Form @submit="update" class="flex flex-col" :validation-schema="schema">

      <ImageUpload v-model="image" :url="user.photoURL"/>

      <div class="flex flex-col mb-5">
        <h5 class="input-label">{{ $t('username') }}</h5>
        <Field class="text-input" name="username" :value="user?.username"/>
        <ErrorMessage class="error-msg" name="username"/>
      </div>

      <div class="flex flex-col mb-5">
        <h5 class="input-label">{{ $t('lang') }}</h5>
        <n-select v-model:value="lang" :options="[{label: $t('en'), value: 'en'}, {label: $t('fr'), value: 'fr'}]"/>
      </div>

      <button type="button" class="bg-red-500 text-white_500 px-10 py-2 rounded w-fit mx-auto mb-5" @click="logout">
        {{ $t('logout') }}
      </button>

      <div class="flex gap-4 justify-end items-center">
        <button type="button" class="text-white_500" @click="show = false">{{ $t('cancel') }}</button>
        <button class="bg-purple text-white_500 rounded px-3 py-2.5">{{ $t('settings.update') }}</button>
      </div>

    </Form>
  </DialogWrapper>
</template>

<script>
import {NSelect, useMessage} from 'naive-ui';
import {ErrorMessage, Field, Form} from 'vee-validate';
import * as yup from 'yup';
import ImageUpload from '../../../components/imageUpload.vue';
import DialogWrapper from '../../../components/dialogWrapper.vue';
import {mapState} from 'vuex';
import User from '@/api/user';
import Auth from '@/api/auth';
import {changeLang} from '@/i18n/i18n.service';

export default {
  name: 'settings',
  components: {DialogWrapper, ImageUpload, Form, Field, ErrorMessage, NSelect},
  data() {
    const schema = yup.object({
      username: yup.string().min(3).max(30),
    });

    return {
      lang: this.$i18n.locale,
      message: useMessage(),
      imageURL: null,
      image: null,
      show: false,
      schema,
    };
  },
  watch: {
    '$i18n.locale': function (newVal) {
      this.lang = newVal;
    },
    lang(newValue) {
      changeLang(newValue);
    },
  },
  computed: {
    ...mapState('auth', ['user']),
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.image = files[0];
      this.imageURL = URL.createObjectURL(files[0]);
    },
    update(data) {
      const fd = new FormData();
      if (this.image) fd.append('image', this.image);

      for (const [key, value] of Object.entries(data)) {
        fd.append(key, value);
      }

      User.update(fd).catch(() => {
        this.message.error(this.$t('settings.edit_error'));
      }).finally(() => this.show = false);
    },
    logout() {
      Auth.logout().then(() => {
        this.$router.push('login');
      });
    },
  },
};
</script>

<style scoped>
</style>

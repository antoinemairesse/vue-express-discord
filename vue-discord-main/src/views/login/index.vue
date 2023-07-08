<template>
  <div class="w-screen h-screen bg-login flex justify-center items-center">
    <div class="bg-gray_600 rounded-xl p-10 w-[600px]">
      <h2 class="text-center text-white_500 text-2xl font-extrabold">
        {{ $t("login.welcome_back") }}
      </h2>
      <p class="text-label text-center mb-4">{{ $t("login.see_you_again") }}</p>
      <h2 v-if="error" class="text-red-500">{{ $t("login.error") }}</h2>

      <Form @submit="submit" class="flex flex-col" :validation-schema="schema"
        >`

        <div class="flex flex-col mb-5">
          <h5 class="input-label">{{ $t("email") }}</h5>
          <Field class="text-input" name="email" />
          <ErrorMessage class="error-msg" name="email" />
        </div>

        <div class="flex flex-col mb-5">
          <h5 class="input-label">{{ $t("password") }}</h5>
          <Field class="text-input w-full" name="password" type="password" />
          <ErrorMessage class="error-msg" name="password" />
          <span class="text-link text-sm">{{
            $t("login.forgot_password")
          }}</span>
        </div>

        <button
          :class="{ 'cursor-not-allowed opacity-50': loading }"
          class="bg-purple text-white_500 rounded px-3 py-2.5 mb-2"
          :disabled="loading"
        >
          {{ $t("signin") }}
        </button>

        <span class="text-sm text-gray_200">
          {{ $t("login.need_account") }}
          <router-link to="/register" class="text-link">{{
            $t("register")
          }}</router-link>
        </span>
      </Form>
    </div>
  </div>
</template>

<script>
import { ErrorMessage, Field, Form } from "vee-validate";

import * as yup from "yup";
import { mapActions, mapState } from "vuex";

export default {
  name: "index.vue",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().required(),
    });
    return {
      schema,
    };
  },
  computed: {
    ...mapState("auth", ["error", "loading"]),
  },
  methods: {
    ...mapActions("auth", ["login"]),
    submit(data) {
      this.login(data);
    },
  },
};
</script>

<style scoped></style>

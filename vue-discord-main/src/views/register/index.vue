<template>
  <div class="w-screen h-screen bg-login flex justify-center items-center">
    <div class=" bg-gray_600 rounded-xl p-10 w-[600px]">
      <h2 class="text-center text-white_500 text-2xl font-extrabold mb-5">Créer un compte</h2>
      <Form @submit="submit" class="flex flex-col" :validation-schema="schema">
        <div class="flex flex-col mb-5">
          <h5 class="input-label">E-mail</h5>
          <Field class="text-input" name="email"/>
          <ErrorMessage class="error-msg" name="email"/>
        </div>
        <div class="flex flex-col mb-5">
          <h5 class="input-label">Nom d'utilisateur</h5>
          <Field class="text-input w-full" name="username"/>
          <ErrorMessage class="error-msg" name="username"/>
        </div>
        <div class="flex flex-col mb-5">
          <h5 class="input-label">Mot de passe</h5>
          <Field class="text-input w-full" name="password" type="password"/>
          <ErrorMessage class="error-msg" name="password"/>
        </div>
        <button
            :class="{'cursor-not-allowed opacity-50': loading}"
            class="bg-purple text-white_500 rounded px-3 py-2.5 mb-2"
            :disabled="loading">
          Continuer
        </button>
        <router-link to="/login" class="text-link text-sm">Tu as déjà un compte ?</router-link>
      </Form>
    </div>
  </div>
</template>

<script>
import {ErrorMessage, Field, Form} from 'vee-validate';

import * as yup from 'yup';
import {mapActions, mapState} from 'vuex';

export default {
  name: 'index.vue',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      email: yup.string().required().email(),
      username: yup.string().required().min(3).max(30),
      password: yup.string().required().min(5),
    });

    return {
      schema,
    };
  },
  computed: {
    ...mapState('auth', ['error', 'loading']),
  },
  methods: {
    ...mapActions('auth', ['signup']),
    submit(data) {
      this.signup(data);
    },
  },
};
</script>

<style scoped>

</style>

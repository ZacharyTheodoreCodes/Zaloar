<script>
import LoginPage from "../components/LoginPage.vue";
import RegisterPage from "../components/RegisterPage.vue";

export default {
  components: {
    LoginPage,
    RegisterPage,
  },
  props: ["currentPage", "errors"],
  emits: ["changePage", "login", "register", "googleSignIn", "handleError"],
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
    login(loginData) {
      this.$emit("login", loginData);
    },
    googleSignIn(loginData) {
      this.$emit("googleSignIn", loginData);
    },
    register(registrationData) {
      this.$emit("register", registrationData);
    },
    handleError(error) {
      this.$emit("handleError", error);
    },
  },
};
</script>

<template>
  <LoginPage
    v-if="currentPage === 'login'"
    @changePage="changePage"
    @login="login"
    @googleSignIn="googleSignIn"
  />
  <RegisterPage
    v-if="currentPage === 'register'"
    :errors="errors"
    @changePage="changePage"
    @register="register"
    @handleError="handleError"
  />
</template>

<style scoped></style>

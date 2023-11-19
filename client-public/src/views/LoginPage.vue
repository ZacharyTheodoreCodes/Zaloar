<script>
import { mapActions } from 'pinia'
import { useAuthStore } from '../stores/auth'
import { GoogleLogin } from 'vue3-google-login'

export default {
  components: { GoogleLogin },
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['login', 'googleSignIn']),
    doLogin() {
      this.login(this.loginData)
    },
    doGoogleSignIn(loginInput) {
      this.googleSignIn(loginInput)
    }
  }
}
</script>

<template>
  <section class="bg-gray-50" id="login-section">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="doLogin">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
                >Your email</label
              >
              <input
                type="email"
                id="login-email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                autocomplete="off"
                v-model="loginData.email"
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
                >Password</label
              >
              <input
                type="password"
                id="login-password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 0"
                autocomplete="off"
                v-model="loginData.password"
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-indigo-400 hover:bg-indigo-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500">
              Don’t have an account yet?
              <a
                @click="$router.push('/register')"
                class="font-medium text-primary-600 hover:underline"
                >Sign up</a
              >
            </p>
            <GoogleLogin :callback="doGoogleSignIn" />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>

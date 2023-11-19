<script>
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '../stores/auth'

export default {
  components: {},
  data() {
    return {
      registerData: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState(useAuthStore, ['errors'])
  },
  methods: {
    ...mapActions(useAuthStore, ['register']),
    doRegister() {
      this.register(this.registerData)
    }
  }
}
</script>
<template>
  <section class="bg-gray-50" id="register-section">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            Create an account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="doRegister">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
                >Your email</label
              >
              <input
                :class="[{ errorClass: errors?.register?.email }]"
                type="email"
                id="register-email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                autocomplete="off"
                v-model="registerData.email"
              />
              <span v-if="errors?.register?.email" class="errorMsg">
                * {{ errors.register.email }}
              </span>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
                >Password</label
              >
              <input
                :class="[{ errorClass: errors?.register?.password }]"
                type="password"
                id="register-password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                autocomplete="off"
                v-model="registerData.password"
              />
              <span v-if="errors?.register?.password" class="errorMsg">
                * {{ errors.register.password }}
              </span>
            </div>

            <button
              type="submit"
              class="w-full text-white bg-indigo-400 hover:bg-indigo-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create an account
            </button>
            <p class="text-sm font-light text-gray-500">
              Already have an account?
              <a href="#" class="font-medium hover:underline" @click="$router.push('/login')"
                >Login here</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.errorClass {
  @apply !border-red-500 !mb-2;
}

.errorMsg {
  @apply !text-red-500;
}
</style>

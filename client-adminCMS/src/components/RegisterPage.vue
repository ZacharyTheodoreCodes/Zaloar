<script>
export default {
  props: ["errors"],
  emits: ["changePage", "register", "handleError"],
  data() {
    return {
      registrationForm: {
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      },
    };
  },
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
    register() {
      this.$emit("register", this.registrationForm);
      this.$emit("handleError", []);
    },
  },
};
</script>

<template>
  <section class="bg-gray-50" id="register-section">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            Create an account
          </h1>
          <form
            @submit.prevent="register"
            class="space-y-4 md:space-y-6"
            action="#"
          >
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Username</label
              >
              <input
                :class="[{ errorInput: errors?.username }]"
                v-model="registrationForm.username"
                type="text"
                id="register-username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter your username ..."
                autocomplete="off"
              />
            </div>
            <span v-if="errors?.username" class="errMessage">{{
              errors.username
            }}</span>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Your email</label
              >
              <input
                :class="[{ errorInput: errors?.email }]"
                v-model="registrationForm.email"
                type="email"
                id="register-email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                autocomplete="off"
              />
              <span v-if="errors?.email" class="errMessage">{{
                errors.email
              }}</span>
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Password</label
              >
              <input
                :class="[{ errorInput: errors?.password }]"
                v-model="registrationForm.password"
                type="password"
                id="register-password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                autocomplete="off"
              />
              <span v-if="errors?.password" class="errMessage">{{
                errors.password
              }}</span>
            </div>
            <div>
              <label
                for="phone-number"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Phone Number</label
              >
              <input
                :class="[{ errorInput: errors?.phoneNumber }]"
                v-model="registrationForm.phoneNumber"
                type="text"
                id="register-phone"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter your phone-number ..."
                autocomplete="off"
              />
              <span v-if="errors?.phoneNumber" class="errMessage">{{
                errors.phoneNumber
              }}</span>
            </div>
            <div>
              <label
                for="Address"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Address</label
              >
              <textarea
                :class="[{ errorInput: errors?.address }]"
                v-model="registrationForm.address"
                id="register-address"
                rows="3"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter your address ..."
                autocomplete="off"
              ></textarea>
              <span v-if="errors?.address" class="errMessage">{{
                errors.address
              }}</span>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-indigo-400 hover:bg-indigo-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create an account
            </button>
            <p class="text-sm font-light text-gray-500">
              Already have an account?
              <a
                href="#"
                class="font-medium hover:underline"
                @click.prevent="changePage('login')"
                >Login here</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.errorInput {
  @apply border-red-500 mb-1;
}

.errMessage {
  @apply text-red-500 text-sm;
}
</style>

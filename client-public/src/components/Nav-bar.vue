<script>
import { RouterLink } from 'vue-router'
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '../stores/products'
import { useAuthStore } from '../stores/auth'

export default {
  components: {
    RouterLink
  },
  computed: {
    ...mapState(useAuthStore, ['authenticated'])
  },
  methods: {
    ...mapActions(useAuthStore, ['logout']),
    ...mapActions(useProductStore, ['fetchProduct', 'updateQueryCategory', 'updateQueryName']),
    emptyQuery() {
      this.updateQueryCategory(null)
      this.updateQueryName('')
      this.fetchProduct(1)
    }
  }
}
</script>
<template>
  <nav
    class="z-[100] bg-gradient-to-r from-indigo-300 to-rose-200 shadow-lg fixed w-full top-0 text-slate-100 text-lg"
  >
    <div class="mx-auto sm:px-6 lg:px-10">
      <div class="relative flex h-16 items-center justify-between">
        <!-- Navbar Left -->
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <!-- Logo / Brand Name -->
          <div class="flex flex-shrink-0 items-center gap-[4px] cursor-default">
            <span> <i class="fa-solid fa-shirt mr-2"></i></span>
            <span class="text-2xl">Zaloar</span>
          </div>

          <!-- Nav Link Normal View -->
          <div class="hidden sm:ml-[40px] sm:block">
            <div class="flex space-x-4">
              <RouterLink
                class="hover:opacity-60 rounded-md px-5 py-2 hover:text-indigo-500"
                to="/products"
                @click.prevent="emptyQuery"
              >
                Clothings
              </RouterLink>
              <RouterLink
                class="hover:opacity-60 rounded-md px-5 py-2 hover:text-indigo-500"
                v-if="authenticated"
                to="/bookmarks"
              >
                Bookmark
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Navbar Right -->
        <div
          class="hidden sm:flex absolute inset-y-0 right-0 items-center pr-4 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <!-- Nav Link Normal View -->
          <div class="flex gap-[20px]" v-if="!authenticated">
            <RouterLink class="rounded-full hover:text-indigo-500" to="/login">Login</RouterLink>
            <RouterLink class="rounded-full hover:text-indigo-500" to="/register"
              >Register</RouterLink
            >
          </div>

          <div v-else>
            <button
              type="button"
              class="rounded-full hover:text-indigo-500 p-1"
              @click.prevent="logout"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>

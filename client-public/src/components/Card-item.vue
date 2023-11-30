<script>
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '../stores/auth'
import { useBookmarkStore } from '../stores/bookmark'
import { useProductStore } from '../stores/products'

export default {
  props: ['product'],
  methods: {
    ...mapActions(useBookmarkStore, [
      'fetchBookmarks',
      'getBookmarkId',
      'addBookmark',
      'deleteBookmark'
    ]),
    ...mapActions(useProductStore, ['formattedPrice'])
  },
  computed: {
    ...mapState(useAuthStore, ['authenticated']),
    ...mapState(useBookmarkStore, ['bookmarksArr']),
    checkBookmark() {
      return this.bookmarksArr.includes(this.product.id)
    }
  },
  created() {
    if (this.authenticated) {
      this.fetchBookmarks()
    }
  }
}
</script>
<template>
  <div class="my-1 w-full lg:my-4 lg:px-4 shadow-lg rounded-lg">
    <a class="ml-1 text-indigo-300 cursor-pointer hover:opacity-80" href="#">
      <img
        @click.prevent="$router.push(`/products/${product.id}`)"
        class="mx-auto"
        :src="product.imgUrl"
        :alt="product.name"
      />
    </a>
    <div class="py-4 pb-3">
      <div class="flex place-content-between py-2">
        <div class="flex gap-4">
          <h1 class="font-bold text-xl col-start-1 col-span-5">{{ product.name }}</h1>
          <span
            class="self-start items-center bg-indigo-200 rounded-lg px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            #{{ product.Category.name }}</span
          >
        </div>
        <button class="hover:opacity-60" v-if="authenticated">
          <i
            v-if="checkBookmark"
            @click.prevent="deleteBookmark(getBookmarkId(product.id))"
            class="fa-solid fa-heart text-[20px]"
            style="color: #5c64ad"
          ></i>
          <i
            class="fa-regular fa-heart text-[20px]"
            v-else
            @click.prevent="addBookmark(product.id)"
          ></i>
        </button>
      </div>
      <p class="text-gray-700 text-base product-description">{{ product.description }}</p>
    </div>
    <div class="pb-4 text-gray-800 block text-[16px] font-bold">
      &nbsp;Rp {{ formattedPrice(product.price) }}
    </div>
  </div>
</template>

<style scoped></style>

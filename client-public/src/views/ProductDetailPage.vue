<script>
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '../stores/products'
import { useBookmarkStore } from '../stores/bookmark'
import { useAuthStore } from '../stores/auth'

export default {
  methods: {
    ...mapActions(useProductStore, ['fetchProductDetail']),
    ...mapActions(useBookmarkStore, ['getBookmarkId', 'addBookmark', 'deleteBookmark']),
    ...mapActions(useProductStore, ['formattedPrice'])
  },
  computed: {
    ...mapState(useProductStore, ['product', 'qrCode']),
    ...mapState(useAuthStore, ['authenticated']),
    ...mapState(useBookmarkStore, ['bookmarksArr']),
    checkBookmark() {
      return this.bookmarksArr.includes(this.product.id)
    }
  },
  created() {
    this.fetchProductDetail(this.$route.params.id)
  }
}
</script>

<template>
  <section class="text-gray-700 overflow-hidden bg-white">
    <div class="container px-5 py-20 mx-auto">
      <div class="w-full max-w-md mr-auto ml-auto mt-4 mb-2 text-center">
        <h1 class="text-gray-800 block text-3xl font-bold">Zaloar {{ product.Category.name }}</h1>
      </div>

      <div class="lg:w-4/5 mx-auto mt-16 flex flex-wrap">
        <!-- left section -->
        <div class="lg:w-1/2 w-full lg:pr-14 lg:mt-0">
          <div class="flex gap-4 items-center mb-2">
            <h1 class="text-gray-900 text-3xl font-medium">{{ product.name }}</h1>
            <span
              class="inline-block bg-indigo-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700"
            >
              #&nbsp;{{ product.Category.name }}</span
            >
          </div>
          <!-- product name -->

          <!-- description -->
          <p class="leading-relaxed">
            {{ product.description }}
          </p>

          <!-- price,stock, qrcode -->
          <div class="flex border-b-2 place-content-between items-center border-indigo-300 pb-4 mb-4 mt-6">
            <!-- price & stock -->

            <!-- price -->
            <div class="">
              <span class="font-semibold text-3xl text-gray-900">
                <sup>Rp</sup>&nbsp;{{ formattedPrice(product.price) }}</span
              >
            </div>

            <!-- stocks -->
            <div class="">
              <span class="">Stock: </span>
              <span
                ><b>{{ product.stock }}</b
                >&nbsp;item&#40;s&#41;</span
              >
            </div>
          </div>

          <!-- button -->
        
            <div v-if="authenticated" class="flex">
              <button
                v-if="checkBookmark"
                class="bg-rose-500 hover:bg-rose-500 text-white border-0 py-2 px-6 focus:outline-none hover:opacity-60 rounded w-full"
                @click.prevent="deleteBookmark(getBookmarkId(product.id))"
              >
                Remove from bookmark
              </button>
              <button
                v-else
                class="bg-indigo-500 hover:bg-indigo-500 text-white border-0 py-2 px-6 focus:outline-none hover:opacity-60 rounded w-full"
                @click.prevent="addBookmark(product.id)"
              >
                Add to bookmark
              </button>
            </div>
      
        </div>
        <!-- left -->
        <img
          :alt="product.name"
          class="lg:w-1/2 w-full object-cover object-center rounded border"
          :src="product.imgUrl"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.qrCode:deep(svg) {
  height: 174px;
  width: 174px;
}
</style>

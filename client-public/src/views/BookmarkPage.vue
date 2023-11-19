<script>
import { mapState, mapActions } from 'pinia'
import { useBookmarkStore } from '../stores/bookmark'

import CardItem from '../components/Card-item.vue'

export default {
  components: {
    CardItem
  },
  methods: {
    ...mapActions(useBookmarkStore, ['fetchBookmarks'])
  },
  computed: {
    ...mapState(useBookmarkStore, ['bookmarks'])
  },
  created() {
    this.fetchBookmarks()
  }
}
</script>

<template>
  <section id="bookmark-section" class="container mx-auto pb-[80px] pt-[40px]">
    <div class="w-full max-w-md mr-auto ml-auto mt-4 mb-2 text-center py-10">
      <h1 class="text-gray-800 block text-3xl font-bold">Bookmarks</h1>
    </div>

    <div class="py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div>
        <div class="mt-0 mb-8 mx-auto grid grid-cols-4 gap-4">
          <CardItem v-for="product in bookmarks" :key="product.id" :product="product.Product" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>

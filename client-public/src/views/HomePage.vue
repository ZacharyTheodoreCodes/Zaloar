<script>
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '../stores/products'

import CardItem from '../components/Card-item.vue'
import SearchBar from '../components/Search-bar.vue'
import Pagination from '../components/Pagination-element.vue'

export default {
  components: {
    CardItem,
    SearchBar,
    Pagination
  },
  methods: {
    ...mapActions(useProductStore, ['fetchProduct'])
  },
  computed: {
    ...mapState(useProductStore, ['products'])
  },
  created() {
    this.fetchProduct(1)
  }
}
</script>

<template>
  <section class="container mx-auto py-[40px]">
    <div class="flex items-center gap-6 justify-center my-20">
      <!-- <div class=" mr-auto ml-auto mt-4 mb-2 text-center"> -->
      <h1 class="text-gray-800 block text-3xl font-bold">Zaloar Clothings</h1>
      <!-- </div> -->

      <!-- <div class="sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mt-10 flex justify-center"> -->
      <SearchBar />
      <!-- </div> -->
    </div>

    <div class="py-2 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-8">
      <div>
        <div class="mt-0 mb-8 mx-auto grid grid-cols-4 gap-4">
          <CardItem v-for="product in products" :key="product.id" :product="product" />
        </div>
        <Pagination />
      </div>
    </div>
  </section>
</template>

<style scoped></style>

<script>
import ProductTable from "./ProductTable.vue";
export default {
  components: {
    ProductTable,
  },
  props: ["currentUser", "currentPage", "products"],
  emits: ["changePage", "updateSelectedProductId", "changeStatus"],
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
    updateSelectedProductId(id) {
      this.$emit("updateSelectedProductId", id);
    },
    changeStatus(product) {
      this.$emit("changeStatus", product);
    },
  },
};
</script>
<template>
  <section class="ml-64 mt-16 bg-gray-50" id="product-section">
    <div class="mx-4 h-screen">
      <div class="py-3 mb-8 border-b flex place-content-between">
        <h5 class="text-gray-700 font-bold text-3xl">Products</h5>
        <button
          @click.prevent="changePage('addProduct')"
          class="bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-full"
        >
          Add New Product
        </button>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <ProductTable
          :currentUser="currentUser"
          :currentPage="currentPage"
          :products="products"
          @changePage="changePage"
          @updateSelectedProductId="updateSelectedProductId"
          @changeStatus="changeStatus"
        />
      </div>
    </div>
  </section>
</template>
<style></style>

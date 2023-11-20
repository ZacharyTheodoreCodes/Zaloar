<script>
import TableRow from "../TableRow.vue";
export default {
  components: {
    TableRow,
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
  <table class="w-full text-sm text-left text-gray-500">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr class="text-center bg-indigo-200">
        <th scope="col" class="px-6 py-3">No.</th>
        <th scope="col" class="px-6 py-3">Name</th>
        <th scope="col" class="px-6 py-3 w-[180px]">Image</th>
        <th scope="col" class="px-6 py-3 w-[250px]">Description</th>
        <th scope="col" class="px-6 py-3">Stock</th>
        <th scope="col" class="px-6 py-3">Price</th>
        <th scope="col" class="px-6 py-3">Author</th>
        <th scope="col" class="px-6 py-3">Status</th>
        <th scope="col" class="px-6 py-3">Action</th>
      </tr>
    </thead>
    <tbody class="text-center">
      <TableRow
        v-for="(product, index) in products"
        :key="product.id"
        :product="product"
        :index="index"
        :currentUser="currentUser"
        :currentPage="currentPage"
        @changePage="changePage"
        @updateSelectedProductId="updateSelectedProductId"
        @changeStatus="changeStatus"
      />
    </tbody>
  </table>
</template>

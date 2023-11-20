<script>
import TableRow from "../TableRow.vue";
export default {
  components: {
    TableRow,
  },
  props: ["currentUser", "currentPage", "categories"],
  emits: ["changePage", "deleteCategory"],
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
    deleteCategory(categoryId) {
      this.$emit("deleteCategory", categoryId);
    },
  },
};
</script>
<template>
  <table class="w-full text-sm text-left text-gray-500">
    <thead
      class="text-xs w-full bg-indigo-200 text-left text-gray-700 uppercase"
    >
      <tr>
        <th scope="col" class="px-6 py-3 w-1/12">No.</th>
        <th scope="col" class="px-6 py-3 w-10/12">Name</th>
        <th scope="col" class="px-6 py-3 w-1/12">Action</th>
      </tr>
    </thead>
    <tbody
      class="text-left font-semibold bg-white border-b-2 border-b-indigo-300"
    >
      <TableRow
        v-for="(category, index) in categories"
        :key="category.id"
        :category="category"
        :index="index"
        :currentUser="currentUser"
        :currentPage="currentPage"
        @changePage="changePage"
        @deleteCategory="deleteCategory"
      />
    </tbody>
  </table>
</template>
<style></style>

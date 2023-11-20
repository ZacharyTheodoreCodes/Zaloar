<script>
import CategoryTable from "./CategoryTable.vue";
export default {
  components: {
    CategoryTable,
  },
  props: ["currentUser", "currentPage", "categories"],
  emits: ["changePage","deleteCategory"],
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
    deleteCategory(categoryId){
      this.$emit("deleteCategory",categoryId)
    }
  },
};
</script>

<template>
  <section class="ml-64 mt-16 bg-gray-50" id="category-section">
    <div class="mx-4 h-screen">
      <div class="py-3 mb-8 border-b flex place-content-between">
        <h5 class="text-gray-700 font-bold text-3xl">Categories</h5>
        <button
          @click.prevent="changePage('addCategory')"
          class="bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-full"
        >
          Add New Category
        </button>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <CategoryTable
          :currentUser="currentUser"
          :currentPage="currentPage"
          :categories="categories"
          @changePage="changePage"
          @deleteCategory="deleteCategory"
        />
      </div>
    </div>
  </section>
</template>
<style></style>

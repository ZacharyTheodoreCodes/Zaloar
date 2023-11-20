<script>
export default {
  props: ["errors"],
  emits: ["changePage", "addCategory", "handleError"],
  data() {
    return {
      Category: {
        name: "",
      },
    };
  },
  methods: {
    changePage(page) {
      this.$emit("handleError", []);
      this.$emit("changePage", page);
    },
    addCategory() {
      this.$emit("addCategory", this.category);
    },
    submitCategoryForm() {
      this.$emit("handleError", []);
      this.addCategory();
    },
  },
  created() {
    this.category = {
      name: "",
    };
  },
};
</script>
<template>
  <section class="ml-64 mt-16 bg-gray-50" id="new-category-section">
    <div class="mx-4 h-screen">
      <div class="py-5 mb-4 border-b">
        <h5 class="text-gray-700 font-bold text-3xl">Add New Category</h5>
      </div>
      <div class="w-2/5">
        <form
          @submit.prevent="submitCategoryForm"
          class="space-y-4 md:space-y-6"
        >
          <div>
            <label
              for="category-name"
              class="block mb-2 text-sm font-medium text-gray-900 after:content-['*'] after:text-pink-500 after:ml-0.5"
              >Name</label
            >
            <input
              :class="[{ errorInput: errors?.name }]"
              type="text"
              id="category-name"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="Enter category name"
              autocomplete="off"
              v-model="category.name"
            />
            <span v-if="errors?.name" class="errMessage">{{
              errors.name
            }}</span>
          </div>
          <div class="flex gap-2">
            <button
              @click.prevent="changePage('categories')"
              type=""
              class="w-full text-gray-900 border border-rose-400 hover:bg-rose-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="w-full text-white bg-indigo-400 hover:bg-primary-700 focus:ring-4 hover:bg-indigo-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create Category
            </button>
          </div>
        </form>
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

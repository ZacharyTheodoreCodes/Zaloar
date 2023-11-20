<script>
export default {
  props: [
    "product",
    "category",
    "history",
    "index",
    "currentUser",
    "currentPage",
  ],
  emits: ["changePage", "updateSelectedProductId", "changeStatus"],
  data() {
    return {
      status: ["Active", "Inactive", "Archived"],
      productStatus: "",
    };
  },
  methods: {
    changePage(page) {
      this.$emit("updateSelectedProductId", this.product.id);
      this.$emit("changePage", page);
    },
    changeStatus() {
      const modifiedProduct = {
        id: this.product.id,
        status: this.productStatus,
      };
      this.$emit("changeStatus", modifiedProduct);
    },
    deleteCategory(categoryId) {
      this.$emit("deleteCategory", categoryId);
    },
  },
  created() {
    if (this.currentPage === "products") {
      this.productStatus = this.product.status;
    }
  },
};
</script>

<template>
  <!-- Table row product -->
  <tr
    v-if="currentPage === 'products'"
    class="bg-white border-b-2 border-b-indigo-300"
  >
    <td>{{ index + 1 }}</td>
    <td>{{ product.name }}</td>
    <td>
      <img :src="product.imgUrl" class="img-fluid" />
    </td>
    <td>{{ product.description }}</td>
    <td>{{ product.stock }}</td>
    <td class="font-bold">
      {{ product.price }}
    </td>
    <td>{{ product.User.username }}</td>
    <td>
      <div>
        <select
          v-if="currentUser.role === 'Admin'"
          v-model="productStatus"
          @change="changeStatus"
          class="bg-indigo-100 hover:bg-indigo-200 font-medium rounded-lg p-2 text-center inline-flex items-center"
        >
          <option
            v-for="perStatus in status"
            :key="index"
            :value="perStatus"
            :selected="product.status === perStatus"
          >
            {{ perStatus }}
          </option>
        </select>
        <p v-else>{{ product.status }}</p>
      </div>
    </td>
    <td>
      <a
        v-if="
          currentUser.role === 'Admin' ||
          (currentUser.role !== 'Admin' &&
            product.User.email === currentUser.email)
        "
        @click.prevent="changePage('editProduct')"
        class="font-medium text-blue-600 hover:underline"
        >Edit</a
      >
    </td>
  </tr>
  <!-- Table row categories -->
  <tr
    v-if="currentPage === 'categories'"
    class="border-b-2 border-b-indigo-100"
  >
    <td class="px-6 py-3">{{ index + 1 }}</td>
    <td class="px-6 py-3">{{ category.name }}</td>
    <td class="px-6 py-3">
      <div class="flex gap-2">
        <!-- <a href="#" class="font-medium text-blue-600 hover:underline">Edit</a> -->
        <a
          @click.prevent="deleteCategory(category.id)"
          class="font-medium text-red-500 hover:underline"
          >Delete</a
        >
      </div>
    </td>
  </tr>

  <!-- Table row histories -->
  <tr v-if="currentPage === 'histories'" class="border-b-2 border-b-indigo-100">
    <td class="px-6 py-3">{{ index + 1 }}</td>
    <td class="px-6 py-3">{{ history.title }}</td>
    <td class="px-6 py-3">{{ history.description }}</td>
    <td class="px-6 py-3">{{ history.createdAt }}</td>
    <td class="px-6 py-3">{{ history.updatedBy }}</td>
  </tr>
</template>

<style></style>

<script>
import ReusableButton from "../ReusableButton.vue";
export default {
  components: {
    ReusableButton,
  },
  props: ["categories", "currentPage", "selectedProduct", "errors"],
  emits: ["changePage", "addProduct", "editProduct", "handleError"],
  data() {
    return {
      product: {
        name: "",
        categoryId: "",
        description: "",
        stock: "",
        price: "",
        imgUrl: "",
      },
    };
  },
  methods: {
    changePage(page) {
      this.$emit("handleError", []);
      this.$emit("changePage", page);
    },
    addProduct() {
      this.$emit("addProduct", this.product);
    },
    editProduct() {
      this.$emit("editProduct", this.product);
    },
    submitProductForm() {
      this.$emit("handleError", []);
      this.currentPage === "editProduct"
        ? this.editProduct()
        : this.addProduct();
    },
  },
  created() {
    if (this.currentPage === "addProduct") {
      this.product = {
        name: "",
        categoryId: "",
        description: "",
        stock: "",
        price: "",
        imgUrl: "",
      };
    } else {
      this.product = this.selectedProduct;
    }
  },
};
</script>
<template>
  <section class="ml-64 mt-16 bg-gray-50" id="new-product-section">
    <div class="mx-4 h-screen">
      <div class="py-5 mb-4 border-b">
        <h5 class="text-gray-700 font-bold text-3xl">
          {{
            currentPage === "editProduct" ? "Edit Product" : "Add New Product"
          }}
        </h5>
      </div>
      <div class="flex md:gap-5">
        <form
          class="space-y-4 md:space-y-6 w-2/5"
          @submit.prevent="submitProductForm"
        >
          <div>
            <label
              for="product-name"
              class="block mb-2 text-sm font-medium text-gray-900 after:content-['*'] after:text-pink-500 after:ml-0.5"
              >Name</label
            >
            <input
              :class="[{ errorInput: errors?.name }]"
              type="text"
              id="product-name"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="Enter product name"
              autocomplete="off"
              v-model="product.name"
            />
            <span v-if="errors?.name" class="errMessage">{{
              errors.name
            }}</span>
          </div>
          <div>
            <label
              for="product-category"
              class="block mb-2 text-sm font-medium text-gray-900 after:content-['*'] after:text-pink-500 after:ml-0.5"
              >Category</label
            >
            <select
              id="product-category"
              :class="[{ errorInput: errors?.categoryId }]"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              v-model="product.categoryId"
            >
              <option value="" selected disabled>-- Select Category --</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
            <span v-if="errors?.categoryId" class="errMessage">{{
              errors.categoryId
            }}</span>
          </div>
          <div>
            <label
              for="product-desc"
              class="block mb-2 text-sm font-medium text-gray-900 after:content-['*'] after:text-pink-500 after:ml-0.5"
              >Description</label
            >
            <input
              :class="[{ errorInput: errors?.description }]"
              type="text"
              id="product-desc"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="Enter product description"
              autocomplete="off"
              v-model="product.description"
            />
            <span v-if="errors?.description" class="errMessage">{{
              errors.description
            }}</span>
          </div>
          <div class="flex gap-2">
            <div class="w-1/2">
              <label
                for="product-stock"
                class="block mb-2 text-sm font-medium text-gray-900 after:content-['*'] after:text-pink-500 after:ml-0.5"
                >Stock</label
              >
              <input
                :class="[{ errorInput: errors?.stock }]"
                type="number"
                id="product-stock"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder="Enter product stock"
                autocomplete="off"
                v-model="product.stock"
              />
              <span v-if="errors?.stock" class="errMessage">{{
                errors.stock
              }}</span>
            </div>
            <div class="w-1/2">
              <label
                for="product-price"
                class="block mb-2 text-sm font-medium text-gray-900 after:content-['*'] after:text-pink-500 after:ml-0.5"
                >Price</label
              >
              <input
                :class="[{ errorInput: errors?.price }]"
                type="number"
                id="product-price"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder="Enter product price"
                autocomplete="off"
                v-model="product.price"
              />
              <span v-if="errors?.price" class="errMessage">{{
                errors.price
              }}</span>
            </div>
          </div>

          <div>
            <label
              for="product-image"
              class="block mb-2 text-sm font-medium text-gray-900 after:content-['*'] after:text-pink-500 after:ml-0.5"
              >Image</label
            >
            <input
              :class="[{ errorInput: errors?.imgUrl }]"
              type="url"
              id="product-image"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="Enter product image url"
              autocomplete="off"
              v-model="product.imgUrl"
            />
            <span v-if="errors?.imgUrl" class="errMessage">{{
              errors.imgUrl
            }}</span>
          </div>
          <div class="flex gap-2">
            <button
              @click.prevent="changePage('products')"
              type=""
              class="w-full text-gray-900 border border-rose-400 hover:bg-rose-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Cancel
            </button>
            <ReusableButton :currentPage="currentPage" />
          </div>
        </form>
        <div class="max-h-[575px]" v-if="currentPage === 'editProduct'">
          <img
            :src="product.imgUrl"
            :alt="product.name"
            class="h-[90%] my-auto"
          />
        </div>
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

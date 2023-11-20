<script>
import Sidebar from "../components/Sidebar.vue";
import Dashboard from "../components/Dashboard.vue";
import ProductPage from "../components/Products/ProductPage.vue";
import ProductForm from "../components/Products/ProductForm.vue";
import CategoryPage from "../components/Categories/CategoryPage.vue";
import CategoryForm from "../components/Categories/CategoryForm.vue";
import HistoryPage from "../components/Histories/HistoryPage.vue";

export default {
  components: {
    Sidebar,
    Dashboard,
    ProductPage,
    ProductForm,
    CategoryPage,
    CategoryForm,
    HistoryPage,
  },
  props: [
    "currentPage",
    "currentUser",
    "products",
    "categories",
    "histories",
    "errors",
  ],
  emits: [
    "changePage",
    "logout",
    "addProduct",
    "editProduct",
    "changeStatus",
    "handleError",
    "addCategory",
    "deleteCategory",
  ],
  data() {
    return {
      selectedProductId: null,
      selectedProduct: {
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
      this.$emit("changePage", page);
    },
    logout() {
      this.$emit("logout");
    },
    addProduct(product) {
      this.$emit("addProduct", product);
    },
    editProduct(product) {
      this.$emit("editProduct", product);
    },
    updateSelectedProductId(id) {
      this.selectedProductId = id;
    },
    changeStatus(product) {
      this.$emit("changeStatus", product);
    },
    handleError(error) {
      this.$emit("handleError", error);
    },
    addCategory(category) {
      this.$emit("addCategory", category);
    },
    deleteCategory(categoryId) {
      this.$emit("deleteCategory", categoryId);
    },
  },
  computed: {
    totalProducts() {
      return this.products ? this.products.length : 0;
    },
    totalCategories() {
      return this.categories ? this.categories.length : 0;
    },
    summary() {
      return {
        totalProducts: this.totalProducts,
        totalCategories: this.totalCategories,
      };
    },
  },
  watch: {
    selectedProductId(newSelectedId) {
      if (this.products && newSelectedId) {
        this.selectedProduct = this.products.filter(
          (product) => product.id === newSelectedId
        )[0];
      }
    },
  },
};
</script>

<template>
  <Sidebar
    :currentPage="currentPage"
    @changePage="changePage"
    @logout="logout"
  />
  <Dashboard v-if="currentPage === 'dashboard'" :summary="summary" />

  <ProductPage
    v-else-if="currentPage === 'products'"
    :currentPage="currentPage"
    :currentUser="currentUser"
    :products="products"
    @changePage="changePage"
    @updateSelectedProductId="updateSelectedProductId"
    @changeStatus="changeStatus"
  />
  <ProductForm
    v-else-if="currentPage === 'addProduct' || currentPage === 'editProduct'"
    :currentPage="currentPage"
    :categories="categories"
    :selectedProduct="selectedProduct"
    :errors="errors"
    @changePage="changePage"
    @addProduct="addProduct"
    @editProduct="editProduct"
    @handleError="handleError"
  />
  <CategoryPage
    v-else-if="currentPage === 'categories'"
    :currentPage="currentPage"
    :categories="categories"
    @changePage="changePage"
    @deleteCategory="deleteCategory"
  />
  <CategoryForm
    v-else-if="currentPage === 'addCategory'"
    :errors="errors"
    @changePage="changePage"
    @handleError="handleError"
    @addCategory="addCategory"
  />
  <HistoryPage
    v-else-if="currentPage === 'histories'"
    :currentPage="currentPage"
    :histories="histories"
  />
</template>

<style></style>

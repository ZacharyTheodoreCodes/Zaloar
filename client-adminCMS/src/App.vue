<script>
import axios from "axios";

import Navbar from "./components/NavBar.vue";

import AuthenticationPage from "./views/AuthenticationPage.vue";
import MainPage from "./views/MainFeaturePage.vue";

export default {
  components: {
    Navbar,
    AuthenticationPage,
    MainPage,
  },
  data() {
    return {
      baseUrl: "http://localhost:3000",
      currentPage: "login",
      authenticated: false,
      errors: [],
      currentUser: {
        access_token: "",
        username: "",
        email: "",
        role: "",
      },
      products: [],
      categories: [],
      histories: [],
    };
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    updateCurrentUser(currentUser) {
      this.currentUser = currentUser;
    },
    handleError(error) {
      this.errors = error;
    },
    async login(loginData) {
      try {
        //get data from server
        const result = await axios({
          method: "post",
          url: `${this.baseUrl}/login`,
          data: loginData,
        });

        //set local storage
        const { access_token, username, email, role } = result.data;
        localStorage.access_token = access_token;
        localStorage.username = username;
        localStorage.email = email;
        localStorage.role = role;

        //update current user info
        this.updateCurrentUser(result.data);

        this.authenticated = true;
        //redirect to dashboard
        this.fetch("products");
        this.fetch("categories");
        this.fetch("histories");
        this.changePage("dashboard");

        this.$toast.open({
          message: "You're logged in!",
          type: "success",
          duration: 3000,
          position: "top-right",
          dismissible: true,
        });
      } catch (error) {
        console.log(error.response.data.message);
        this.$toast.open({
          message: `Login Failed <br/> ${error.response.data.message}`,
          type: "error",
          duration: 3000,
          position: "top-right",
          dismissible: true,
        });
      }
    },
    async googleSignIn(loginData) {
      console.log("Encoded JWT ID token: " + loginData.credential);
      try {
        const result = await axios({
          method: "post",
          url: `${this.baseUrl}/google-sign-in`,
          headers: {
            token_google: loginData.credential,
          },
        });
        console.log(result);
        const { access_token, username, email, role } = result.data;
        localStorage.access_token = access_token;
        localStorage.username = username;
        localStorage.email = email;
        localStorage.role = role;

        this.updateCurrentUser(result.data);
        this.authenticated = true;
        this.fetch("products");
        this.fetch("categories");
        this.fetch("histories");
        this.changePage("dashboard");
        this.$toast.open({
          message: "You're logged in!",
          type: "success",
          duration: 3000,
          position: "top-right",
          dismissible: true,
        });
      } catch (error) {
        console.log(error.response.data.message);
        this.$toast.open({
          message: `${error.response.data.message}`,
          type: "error",
          duration: 3000,
          position: "top-right",
          dismissible: true,
        });
      }
    },
    async register(registrationData) {
      try {
        await axios({
          method: "post",
          url: `${this.baseUrl}/register`,
          data: registrationData,
        });

        this.changePage("login");

        this.$toast.open({
          message: "Register Success!",
          type: "success",
          duration: 3000,
          position: "top-right",
          dismissible: true,
        });
      } catch (error) {
        console.log(error.response.data.message);
        this.handleError(error?.response.data.message);
      }
    },
    async logout() {
      //clear local storage
      localStorage.clear();

      //clear current user in state
      this.currentUser.access_token = "";
      this.currentUser.username = "";
      this.currentUser.email = "";
      this.currentUser.role = "";
      this.authenticated = false;
      //redirect to login page
      this.changePage("login");
      this.$toast.open({
        message: "Logged Out",
        type: "success",
        duration: 3000,
        position: "top-right",
        dismissible: true,
      });
    },
    async fetch(entity) {
      try {
        const { data } = await axios({
          method: "get",
          url: `${this.baseUrl}/${entity}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this[entity] = data[entity];
      } catch (error) {
        console.log(error);
      }
    },
    async addProduct(product) {
      try {
        await axios({
          method: "post",
          url: `${this.baseUrl}/products`,
          headers: {
            access_token: localStorage.access_token,
          },
          data: product,
        });
        this.fetch("products");
        this.fetch("histories");
        this.changePage("products");
        this.$toast.open({
          message: "New Product Added",
          type: "success",
          duration: 3000,
          position: "top-right",
          dismissible: true,
        });
      } catch (error) {
        console.log(error.response.data.message);
        this.handleError(error?.response.data.message);
      }
    },
    async editProduct(product) {
      try {
        await axios({
          method: "put",
          url: `${this.baseUrl}/products/${product.id}`,
          headers: {
            access_token: localStorage.access_token,
          },
          data: product,
        });
        this.fetch("products");
        this.fetch("histories");
        this.changePage("products");
        this.$toast.open({
          message: "Product Edited",
          type: "success",
          duration: 3000,
          position: "top-right",
          dismissible: true,
        });
      } catch (error) {
        console.log(error.response.data.message);
        this.handleError(error.response.data.message);
      }
    },
    async changeStatus(product) {
      try {
        await axios({
          method: "patch",
          url: `${this.baseUrl}/products/${product.id}`,
          headers: {
            access_token: localStorage.access_token,
          },
          data: { status: product.status },
        });
        this.fetch("products");
        this.fetch("histories");
        this.changePage("products");

        this.$toast.open({
          message: "Product status changed",
          type: "success",
          duration: 3000,
          position: "top-right",
          dismissible: true,
        });
      } catch (error) {
        console.log(error.response.data.message);
        this.$toast.open({
          message: `${error.response.data.message}`,
          type: "error",
          duration: 3000,
          position: "top-right",
          dismissible: true,
        });
      }
    },
    async addCategory(category) {
      try {
        await axios({
          method: "post",
          url: `${this.baseUrl}/categories`,
          headers: {
            access_token: localStorage.access_token,
          },
          data: category,
        });
        this.fetch("categories");
        this.changePage("categories");
        this.$toast.open({
          message: "New category Added",
          type: "success",
          duration: 3000,
          position: "top-right",
          dismissible: true,
        });
      } catch (error) {
        console.log(error.response.data.message);
        this.handleError(error?.response.data.message);
      }
    },
    async deleteCategory(categoryId) {
      try {
        await axios({
          method: "delete",
          url: `${this.baseUrl}/categories/${categoryId}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.fetch("categories");
        this.changePage("categories");
        this.$toast.open({
          message: "Category Deleted",
          type: "success",
          duration: 3000,
          position: "top-right",
          dismissible: true,
        });
      } catch (error) {
        console.log(error.response.data.message);
        this.handleError(error?.response.data.message);
      }
    },
  },
  created() {
    //check if user already logged in
    if (localStorage.access_token) {
      // get local storage
      this.authenticated = true;
      this.currentPage = "dashboard";
      this.fetch("products");
      this.fetch("categories");
      this.fetch("histories");
      this.currentUser.access_token = localStorage.getItem("access_token");
      this.currentUser.username = localStorage.getItem("username");
      this.currentUser.email = localStorage.getItem("email");
      this.currentUser.role = localStorage.getItem("role");
    } else {
      this.authenticated = false;
      this.currentPage = "login";
    }
  },
};
</script>

<template>
  <!-- Navbar -->
  <Navbar />
  <!-- Authentication -->
  <!-- Will handle if authenticated is false -->
  <AuthenticationPage
    v-if="!authenticated"
    :currentPage="currentPage"
    :errors="errors"
    @changePage="changePage"
    @login="login"
    @register="register"
    @googleSignIn="googleSignIn"
    @handleError="handleError"
  />

  <!-- After Authentication (Main Page CRUD feature) -->
  <MainPage
    v-else
    :currentPage="currentPage"
    :currentUser="currentUser"
    :products="products"
    :categories="categories"
    :histories="histories"
    :errors="errors"
    @changePage="changePage"
    @logout="logout"
    @addProduct="addProduct"
    @editProduct="editProduct"
    @changeStatus="changeStatus"
    @handleError="handleError"
    @addCategory="addCategory"
    @deleteCategory="deleteCategory"
  />
</template>

<style></style>

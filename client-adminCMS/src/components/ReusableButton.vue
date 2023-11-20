<script>
export default {
  props: ["currentPage"],
  data() {
    return {
      buttonName: "",
    };
  },
  created() {
    if (this.currentPage === "addProduct") {
      this.buttonName = "Create Product";
    } else {
      this.buttonName = "Edit Product";
    }
  },
};
</script>

<template>
  <button
    type="submit"
    class="w-full text-white bg-indigo-400 hover:bg-primary-700 focus:ring-4 hover:bg-indigo-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
  >
    {{ buttonName }}
  </button>
</template>

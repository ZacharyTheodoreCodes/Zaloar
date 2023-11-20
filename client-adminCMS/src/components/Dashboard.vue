<script>
export default {
  props: ["summary"],
};
</script>
<template>
  <section class="ml-64 mt-16 bg-gray-50" id="dashboard-section">
    <div class="mx-4 h-screen">
      <div class="py-5 mb-4 border-b">
        <h5 class="text-gray-700 font-bold text-3xl">Dashboard</h5>
      </div>
      <div class="flex gap-2">
        <div
          class="block p-6 w-1/5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gradient-to-r from-indigo-100 to-rose-100"
        >
          <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-500 e">
            Total Products
          </h5>
          <h5 class="font-bold text-gray-700 text-6xl">
            {{ summary.totalProducts }}
          </h5>
        </div>
        <div
          class="block p-6 w-1/5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gradient-to-r from-indigo-100 to-rose-100"
        >
          <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-500 e">
            Categories
          </h5>
          <h5 class="font-bold text-gray-700 text-6xl">
            {{ summary.totalCategories }}
          </h5>
        </div>
      </div>
    </div>
  </section>
</template>
<style></style>

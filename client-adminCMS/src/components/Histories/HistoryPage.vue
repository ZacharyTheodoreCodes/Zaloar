<script>
import HistoryTable from "./HistoryTable.vue";
export default {
  components: {
    HistoryTable,
  },
  props: ["currentPage", "histories"],
};
</script>

<template>
  <section class="ml-64 mt-16 bg-gray-50" id="history-section">
    <div class="mx-4 h-screen">
      <div class="py-3 mb-8 border-b flex place-content-between">
        <h5 class="text-gray-700 font-bold text-3xl">Logs</h5>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <HistoryTable :histories="histories" :currentPage="currentPage" />
      </div>
    </div>
  </section>
</template>

<style></style>

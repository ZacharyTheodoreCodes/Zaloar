<script>
import TableRow from "../TableRow.vue";

export default {
  components: {
    TableRow,
  },
  props: ["histories", "currentPage"],
};
</script>
<template>
  <table class="w-full text-sm text-left text-gray-500">
    <thead
      class="text-xs w-full bg-indigo-200 text-left text-gray-700 uppercase"
    >
      <tr>
        <th scope="col" class="px-6 py-3 w-1/12">No.</th>
        <th scope="col" class="px-6 py-3">Product Name</th>
        <th scope="col" class="px-6 py-3 w-6/12">Description</th>
        <th scope="col" class="px-6 py-3">Created At</th>
        <th scope="col" class="px-6 py-3">Updated By</th>
      </tr>
    </thead>
    <tbody
      class="text-left font-semibold bg-white border-b-2 border-b-indigo-300"
    >
      <TableRow
        v-for="(history, index) in histories"
        :key="history.id"
        :history="history"
        :index="index"
        :currentPage="currentPage"
      />
    </tbody>
  </table>
</template>
<style></style>

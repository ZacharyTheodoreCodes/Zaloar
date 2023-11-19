<script>
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '../stores/products'

export default {
  methods: {
    ...mapActions(useProductStore, ['fetchProduct', 'prevPage', 'nextPage', 'setPage'])
  },
  computed: {
    ...mapState(useProductStore, [
      'totalProducts',
      'pageAmount',
      'pageNumber',
      'getPaginationRange',
      'paginationRange'
    ]),
    pageNumbering() {
      const pages = []
      for (let i = 1; i <= this.pageAmount; i++) {
        pages.push(i)
      }
      return pages
    }
  },
  watch: {
    pageNumber(page) {
      this.fetchProduct(page)
    }
  }
}
</script>

<template>
  <div
    class="flex items-center justify-center border-t border-indigo-300 px-4 py-3 sm:px-6 mx-[40px]"
  >
    <div class="justify-center">
      
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm mb-3" aria-label="Pagination">
          <!-- Prev Page Button-->
          <button
            class="relative inline-flex items-center px-2 py-2 text-gray-400  hover:bg-gray-200  focus:z-20 focus:outline-offset-0 rounded-l-md"
            @click.prevent="prevPage"
            :disabled="pageNumber === 1"
          >
            <span class="sr-only">Previous</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <div v-for="pageNum in pageNumbering" :key="pageNum">
            <button
              :class="pageNum === this.pageNumber ? 'active' : 'inactive'"
              @click.prevent="setPage(pageNum)"
              :disabled="pageNum === this.pageNumber"
            >
              {{ pageNum }}
            </button>
          </div>

          <!-- Next Page Button -->
          <button
            class="relative inline-flex items-center px-2 py-2 text-gray-400  hover:bg-gray-200  focus:z-20 focus:outline-offset-0 rounded-r-md"
            @click.prevent="nextPage"
            :disabled="pageNumber === pageAmount"
          >
            <span class="sr-only">Next</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    

     
      <div>
        <p class="text-sm text-gray-700">
          Viewing
          <span class="font-medium">{{ getPaginationRange.startIndex }}</span>
          -
          <span class="font-medium">{{ getPaginationRange.endIndex }}</span>
          items of
          <span class="font-medium">{{ totalProducts }}</span>
          results
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Pagination element styling */
button.active {
  @apply relative z-10 inline-flex items-center bg-indigo-400  px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400;
}

button.inactive {
  @apply relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 hover:opacity-50  hover:bg-gray-200 focus:z-20 focus:outline-offset-0;
}
</style>

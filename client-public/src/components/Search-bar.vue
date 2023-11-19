<script>
import { mapState, mapActions } from 'pinia'
import { useCategoryStore } from '../stores/category'
import { useProductStore } from '../stores/products'

export default {
  data() {
    return {
      queryName: '',
      queryCategory: null,
      showElement: false
    }
  },
  computed: {
    ...mapState(useCategoryStore, ['categories'])
  },
  methods: {
    ...mapActions(useProductStore, ['fetchProduct', 'updateQueryCategory', 'updateQueryName']),
    ...mapActions(useCategoryStore, ['fetchCategories']),
    updateCategory(cat) {
      this.queryCategory = cat
      this.updateQueryName(this.queryName)
      this.updateQueryCategory(cat.id)
      this.fetchProduct(1)
      this.showElement = false
    },
    doSearch() {
      this.updateQueryName(this.queryName)
      this.fetchProduct(1)
    },
    hideDropdown(event) {
      const trackElement = this.$refs.trackElement
      if (!(trackElement == event.target || trackElement.contains(event.target))) {
        this.showElement = false
      }
    },
    doShowElement() {
      this.showElement = !this.showElement
    }
  },
  created() {
    this.fetchCategories()
  },
  mounted() {
    document.addEventListener('click', this.hideDropdown)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.hideDropdown)
  }
}
</script>
<template>
  <!-- class="mt-[40px] max-w-[800px] w-full px-6" -->
  <form @submit.prevent="doSearch" ref="trackElement" class="max-w-[800px] w-full " >
    <div class="flex">
      <label for="search-dropdown"></label>

      <!-- Category Dropdown -->
      <div class="flex-shrink-0 z-10 relative">
        <button
          id="dropdown-button"
          data-dropdown-toggle="dropdown"
          class="h-[46px] inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 border border-indigo-400 rounded-l-lg hover:bg-indigo-500 hover:opacity-60 hover:text-slate-100 focus:ring-1 focus:outline-none focus:ring-indigo-500"
          type="button"
          @click="doShowElement"
        >
          {{ queryCategory ? queryCategory.name : 'All Categories' }}
          <i class="fa-solid fa-chevron-down w-2.5 h-3 ml-2.5"></i>
        </button>

        <div id="dropdown" v-show="showElement">
          <ul aria-labelledby="dropdown-button">
            <li>
              <button
                @click.prevent="updateCategory({ id: null, name: 'All categories' })"
                type="button"
                class="text-left inline-flex w-full px-4 py-3 hover:bg-gray-100"
              >
                All Categories
              </button>
            </li>
            <li v-for="category in categories" :key="category.id">
              <button
                @click.prevent="updateCategory(category)"
                type="button"
                class="text-left inline-flex w-full px-4 py-3 hover:bg-gray-100"
              >
                {{ category.name }}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="relative h-[46px] w-full">
        <input
          type="search"
          id="search-dropdown"
          placeholder="Or search by name..."
          v-model="queryName"
        />
        <button
          type="submit"
          class="absolute top-0 right-0 px-4 text-sm font-medium h-full text-white bg-indigo-400 hover:opacity-60 transition-opacity duration-100 rounded-r-lg hover:bg-indigo-500"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
          <span class="sr-only">Search</span>
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped>
input {
  @apply !text-[16px] h-full bg-transparent block py-2.5 px-4 w-full z-20 rounded-r-lg border-l-gray-50 border-l-2 border border-indigo-400 focus:ring-indigo-500 focus:border-indigo-500 outline-none;
}

label {
  @apply mb-2 text-sm font-medium sr-only;
}

#dropdown {
  @apply absolute top-[40px] z-10 w-44 !text-[16px];
}

#dropdown ul {
  @apply py-2 text-sm text-gray-700 divide-y divide-gray-200;
}

#dropdown li {
  @apply bg-white shadow;
}
</style>

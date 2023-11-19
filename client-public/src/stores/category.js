import { defineStore } from 'pinia'
import axios from 'axios'

const baseUrl = `http://localhost:3000/pub`

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: []
  }),
  actions: {
    async fetchCategories() {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${baseUrl}/categories`,
          headers: { access_token: localStorage.access_token }
        })

        this.categories = data.categories
      } catch (error) {
        console.log(error)
      }
    }
  }
})

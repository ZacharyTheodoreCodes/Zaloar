import { defineStore } from 'pinia'
import axios from 'axios'

const baseUrl = `http://localhost:3000/pub`

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    product: {},
    qrCode: '',
    query: {
      name: '',
      category: null
    },
    totalProducts: 0,
    productsPerPage: 0,
    pageSize: 8,
    pageNumber: 1,
    pageAmount: 0,
    paginationRange: {
      startIndex: null,
      endIndex: null
    }
  }),
  getters: {
    getPaginationRange(state) {
      let startIndex
      if (state.pageNumber === 1) {
        if (state.totalProducts > 0) {
          startIndex = 1
        } else {
          startIndex = 0
        }
      } else {
        startIndex = state.pageSize * (state.pageNumber - 1) + 1
      }

      const endIndex = state.pageSize * (state.pageNumber - 1) + state.productsPerPage
      return { startIndex, endIndex }
    }
  },
  actions: {
    setPage(page) {
      this.pageNumber = page
    },
    nextPage() {
      if (this.pageNumber < this.pageAmount) {
        this.pageNumber++
      }
    },
    prevPage() {
      if (this.pageNumber > 1) {
        this.pageNumber--
      }
    },
    getPageAmount(totalData, pageSize) {
      return Math.ceil(totalData / pageSize)
    },
    updateQueryName(name) {
      this.query.name = name
    },
    updateQueryCategory(cat) {
      this.query.category = cat
    },
    async fetchProduct(page) {
      try {
        if (page <= 1) {
          this.setPage(1)
        }

        let query = ''

        if (page) {
          query += `page=${+page}&&`
        }
        // console.log(query, 'ini query')
        if (this.query.name) {
          query += `name=${this.query.name}&&`
        }

        if (this.query.category) {
          query += `categoryId=${this.query.category}`
        }

        const { data } = await axios({
          method: 'get',
          url: `${baseUrl}/products?${query}`
        })

        this.products = data.products
        this.totalProducts = data.total

        this.productsPerPage = data.products.length
        this.pageAmount = this.getPageAmount(data.total, this.pageSize)

        this.paginationRange = this.getPaginationRange
      } catch (error) {
        console.log(error)
      }
    },
    async fetchProductDetail(productId) {
      try {
        this.product = null
        const { data } = await axios({
          method: 'get',
          url: `${baseUrl}/products/${productId}`
        })
        this.product = data.product
        this.qrCode = data.qr
      } catch (error) {
        console.log(error)
      }
    },
    formattedPrice(price) {
     return  price.toLocaleString('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    }
  }
})

import { defineStore } from 'pinia'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

import axios from 'axios'

const $toast = useToast()
const baseUrl = `http://localhost:3000/pub`

export const useBookmarkStore = defineStore('bookmark', {
  state: () => ({
    bookmarks: []
  }),
  actions: {
    async fetchBookmarks() {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${baseUrl}/bookmarks`,
          headers: {
            access_token: localStorage.access_token
          }
        })

        this.bookmarks = data.bookmarks
      } catch (error) {
        console.log(error)
      }
    },
    async addBookmark(productId) {
      try {
        const { data } = await axios({
          method: 'post',
          url: `${baseUrl}/bookmarks/${+productId}`,
          headers: { access_token: localStorage.access_token }
        })

        if (data) {
          this.fetchBookmarks()
          $toast.open({
            message: data.message,
            type: 'success',
            duration: 3000,
            position: 'top-right',
            dismissible: true
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async deleteBookmark(bookmarkId) {
      try {
        const { data } = await axios({
          method: 'delete',
          url: `${baseUrl}/bookmarks/${+bookmarkId}`,
          headers: { access_token: localStorage.access_token }
        })

        if (data) {
          this.fetchBookmarks()
          $toast.open({
            message: data.message,
            type: 'success',
            duration: 3000,
            position: 'top-right',
            dismissible: true
          })
        }
      } catch (error) {
        console.log(error.response)
      }
    },
    //output; 1 / 2 /3 , ....
    getBookmarkId(productId) {
      const bookmark = this.bookmarks.find((bookmark) => bookmark.ProductId === +productId)
      return bookmark.id
    }
  },
  //output: [1,2,3,4] -> productId
  getters: {
    bookmarksArr(state) {
      return state.bookmarks.map((bookmark) => bookmark.ProductId)
    }
  }
})

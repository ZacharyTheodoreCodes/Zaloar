import { defineStore } from 'pinia'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import Swal from 'sweetalert2'

import axios from 'axios'

const $toast = useToast()
const baseUrl = `http://localhost:3000/pub`

export const useAuthStore = defineStore('authentication', {
  state: () => ({
    authenticated: localStorage.getItem('access_token'),
    errors: {
      register: null
    }
  }),
  actions: {
    async register(registerInput) {
      try {
        await axios({
          method: 'post',
          url: `${baseUrl}/register`,
          data: registerInput
        })
        this.router.push('/login')

        $toast.open({
          message: 'Register Success',
          type: 'success',
          duration: 3000,
          position: 'top-right',
          dismissible: true
        })
      } catch (error) {
        console.log(error.response.data.message)
        const errorMsg = error.response.data.message
        this.errors.register = errorMsg
      }
    },
    async login(loginInput) {
      try {
        const { data } = await axios({
          method: 'post',
          url: `${baseUrl}/login`,
          data: loginInput
        })
        this.authenticated = true
        localStorage.setItem('access_token', data.access_token)
        this.router.push('/products')

        $toast.open({
          message: 'Login Successful',
          type: 'success',
          duration: 3000,
          position: 'top-right',
          dismissible: true
        })
      } catch (error) {
        console.log(error.response.data.message)
        $toast.open({
          message: `Login Failed<br/>${error.response.data.message}`,
          type: 'error',
          duration: 3000,
          position: 'top-right',
          dismissible: true
        })
      }
    },
    async googleSignIn(loginInput) {
      console.log('Encoded JWT ID token: ' + loginInput.credential)
      try {
        const { data } = await axios({
          method: 'post',
          url: `${baseUrl}/google-sign-in`,
          headers: {
            google_token: loginInput.credential
          }
        })

        const { access_token } = data

        this.authenticated = true
        localStorage.access_token = access_token
        this.router.push('/products')

        $toast.open({
          message: 'Login Successful',
          type: 'success',
          duration: 3000,
          position: 'top-right',
          dismissible: true
        })
      } catch (error) {
        console.log(error.response.data.message)
        $toast.open({
          message: `Login Failed<br/>${error.response.data.message}`,
          type: 'error',
          duration: 3000,
          position: 'top-right',
          dismissible: true
        })
      }
    },
    logout() {
      try {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will be logged out',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.clear()
            this.authenticated = false
            this.router.push('/login')

            $toast.open({
              message: 'Logout Successful',
              type: 'success',
              duration: 3000,
              position: 'top-right',
              dismissible: true
            })
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
})

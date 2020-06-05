import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://burger-builder-4a7da.firebaseio.com/'
})

export default instance

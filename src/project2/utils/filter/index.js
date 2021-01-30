/* eslint-disable */
import formatter from './formatter'
const filters = {
  ...formatter
}
export default {
  install (Vue) {
    for (const key in filters) {
      Vue.filter(key, filters[key])
    } 
  }
}
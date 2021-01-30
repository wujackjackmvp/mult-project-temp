import validate from './validate'
export default {
    install (Vue) {
      /* eslint-disable */
      Vue.prototype.$vaild = Object.assign({}, {...validate})
    }
  }
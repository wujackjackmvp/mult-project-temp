/* eslint-disable no-console */

import { register } from 'register-service-worker'
import { MessageBox } from 'element-ui'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      // console.log()
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      MessageBox.prompt('系统已经更新成功，刷新后即可生效', '系统提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '立即刷新',
        cancelButtonText: '稍后刷新'
      })
      .then(() => {
        window.location.reload()
      })
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}

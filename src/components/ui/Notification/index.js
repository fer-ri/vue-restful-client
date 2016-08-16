import Vue from 'vue'
import defaults from 'lodash/defaults'
import Notification from './Notification'

const NotificationExtend = Vue.extend(Notification)

export default function (propsData) {
  propsData = defaults(propsData, {
    duration: 4000
  })

  return new NotificationExtend({
    el: document.createElement('div'),
    propsData
  })
}

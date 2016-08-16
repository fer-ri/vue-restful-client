import Vue from 'vue'

export default function () {
  Vue.transition('fade', {
    enterClass: 'fadeIn',
    leaveClass: 'fadeOut'
  })

  Vue.transition('zoom', {
    enterClass: 'zoomIn',
    leaveClass: 'zoomOut'
  })

  let types = ['', 'Left', 'Right']

  types.forEach((e) => {
    let name = `bounce${e ? `-${e.toLowerCase()}` : ''}`

    Vue.transition(name, {
      enterClass: `bounceIn${e}`,
      leaveClass: `bounceOut${e}`
    })
  })
}

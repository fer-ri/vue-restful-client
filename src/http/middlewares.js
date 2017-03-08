export default function (router) {
  router.beforeEach(function (transition) {
    // console.log('beforeEach')

    transition.next()
  })

  router.afterEach(() => {
    // console.log('afterEach')
  })
}

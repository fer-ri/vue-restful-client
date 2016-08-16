export default [
  (request, next) => {
    console.log('interceptor 1')
    next()
  },
  (request, next) => {
    console.log('interceptor 2')
    next()
  }
]

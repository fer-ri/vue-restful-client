<template lang="jade">
  h2.page-title Edit Post

  template(v-if="!$loadingRouteData")
    form(v-on:submit.prevent="update(post)")
      .form-group
        label Title
        input.form-control(v-model="post.title", :disabled="updating")
      .form-group
        label Content
        textarea.form-control(v-model="post.content", rows="5", :disabled="updating")
      .form-group
        label Status
        select.form-control(v-model="post.status")
          option(value="draft") DRAFT
          option(value="publish") PUBLISH

      .pull-right
        button.btn.btn-default(type="button", v-on:click="backToIndex") Back
        span &nbsp;
        button.btn.btn-info(type="submit") Submit
</template>

<style lang="sass">
  
</style>

<script>
  import crud from '../mixins/crud'

  export default {
    mixins: [crud],
    data () {
      return {
        endPoint: 'posts',
        post: null
      }
    },
    route: {
      data (transition) {
        this.$http.get(this.endPoint + '/' + this.$route.params.uuid)
          .then(response => {
            transition.next({
              post: response.data.data
            })
          }, response => {
            this.notify('app:error', response)
          })
      }
    }
  }
</script>
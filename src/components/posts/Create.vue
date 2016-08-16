<template lang="jade">
  h2.page-title Create Post

  form(v-on:submit.prevent="store(post)")
    .form-group
      label Title
      input.form-control(v-model="post.title", :disabled="creating")
    .form-group
      label Content
      textarea.form-control(v-model="post.content", rows="5", :disabled="creating")
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
        post: {
          title: '',
          content: '',
          status: 'publish'
        }
      }
    }
  }
</script>
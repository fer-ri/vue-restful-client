<template lang="jade">
  .pull-right
    a.btn.btn-primary(v-link="{ path: this.pathCreate }") Create

  h2.page-title Post

  .hpanel
    .panel-body
      rest-table(
        api-url="endPoint",
        :fields="columns"
      )
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
        columns: [
          {
            name: 'title',
            title: 'Title',
            sort: true
          },
          {
            name: 'created_at',
            title: 'Created At',
            titleClass: 'nowrap',
            dataClass: 'nowrap',
            callback: 'formatDate|MMM D, Y',
            sort: true
          },
          {
            name: '__actions',
            callback: [
              {
                event: 'edit-item',
                elementClass: 'btn btn-xs btn-info',
                html: 'edit'
              },
              {
                event: 'delete-item',
                elementClass: 'btn btn-xs btn-danger',
                html: 'delete'
              }
            ]
          }
        ]
      }
    },
    methods: {
      //
    }
  }
</script>
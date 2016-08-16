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
  import notify from '../mixins/notify'

  export default {
    mixins: [crud, notify],
    data () {
      return {
        endPoint: 'posts',
        columns: [
          {
            name: 'title',
            title: 'Title',
            sortField: 'title'
          },
          {
            name: 'createdAt',
            title: 'Created At',
            titleClass: 'nowrap',
            dataClass: 'nowrap',
            callback: 'formatDate|MMM D, Y'
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
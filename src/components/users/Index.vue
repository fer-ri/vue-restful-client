<template lang="jade">
  .pull-right
    a.btn.btn-primary(v-link="{ path: this.pathCreate }") Create
    
  h2.page-title User
  
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
        endPoint: 'users',
        columns: [
          {
            name: 'name',
            title: 'Name',
            sortField: 'name'
          },
          {
            name: 'email',
            title: 'Email',
            sortField: 'email'
          },
          {
            name: 'role',
            title: 'Role',
            sortField: 'role'
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
    }
  }
</script>
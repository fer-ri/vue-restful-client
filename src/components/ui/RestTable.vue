<template lang="jade">
  .rest-table-wrapper(v-bind:class="wrapperClass")
    table.table.rest-table(v-bind:class="tableClass")
      thead
        tr
          template(v-for="field in fields")
            th(id="_{{ field.name }}", v-bind:class="field.titleClass") 
              | {{ field.title | capitalize }}
      tbody(v-cloak)
        template(v-for="(itemIndex, item) in items")
          tr
            template(v-for="field in fields")
              template(v-if="isReservedField(field.name)")
                template(v-if="field.name === '__actions'")
                  td.rest-table-actions(v-bind:class="field.dataClass")
                    template(v-for="action in field.callback")
                      a(
                        v-bind:class="action.elementClass",
                        v-html="action.html"
                        v-on:click="notify(action.event, item)"
                      )
                      span &nbsp;
              template(v-else)
                td(v-bind:class="field.dataClass")
                  | {{{ renderField(item, field) }}}

    pagination(:pagination="pagination", v-if="pagination")
</template>

<style lang="sass">
  .rest-table
    .rest-table-actions, .nowrap
      width: 1px;
      text-align: right;
      white-space: nowrap;
</style>

<script>
  import Pagination from './Pagination'

  export default {
    components: {
      Pagination
    },
    props: {
      wrapperClass: {
        type: String,
        default () {
          return ''
        }
      },
      tableClass: {
        type: String,
        default () {
          return ''
        }
      },
      apiUrl: {
        type: String,
        required: true
      },
      routePath: {
        type: String,
        default () {
          let path = this.$route.path.substr(1)

          return path.split('?')[0]
        }
      },
      fields: {
        type: Array,
        required: true
      },
      queryParams: {
        type: Object,
        default () {
          return {
            sort: 'sort',
            page: 'page',
            perPage: 'per_page'
          }
        }
      },
      extraParams: {
        type: Object,
        default () {
          return {}
        }
      },
      eventPrefix: {
        type: String,
        default () {
          return 'rest-table:'
        }
      }
    },
    data () {
      return {
        items: [],
        pagination: null,
        slotElements: []
      }
    },
    ready () {
      this.getData()
    },
    computed: {
      currentQuery () {
        return this.$route.query
      },
      whitelistQuery () {
        let apiQuery = Object.assign(this.queryParams, this.extraParams)

        let currentQuery = this.currentQuery

        let whitelist = {}

        for (let key in apiQuery) {
          if (typeof currentQuery[key] !== 'undefined') {
            whitelist.page = currentQuery[key]
          }
        }

        return whitelist
      }
    },
    methods: {
      extractObject (object, path, defaultValue = null) {
        if (path.trim() !== '') {
          let keys = path.split('.')

          keys.forEach((key) => {
            if (object !== null && typeof object[key] !== 'undefined' && object[key] !== null) {
              object = object[key]
            } else {
              object = defaultValue
              return
            }
          })
        }

        return object
      },
      notify (name, args) {
        this.$dispatch(this.eventPrefix + name, args)
        this.$broadcast(this.eventPrefix + name, args)
      },
      titleCase (str) {
        return str.replace(/\w+/g, (s) => {
          return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()
        })
      },
      setTitle (str) {
        if (this.isReservedField(str)) {
          return ''
        }

        return this.titleCase(str)
      },
      isReservedField (fieldName) {
        return fieldName.startsWith('__')
      },
      parsingFields () {
        let parsed = {}

        this.fields.forEach((field, key) => {
          if (typeof (field) === 'string') {
            parsed = {
              name: field,
              title: this.setTitle(field),
              titleClass: '',
              dataClass: '',
              callback: null,
              visible: true
            }
          } else if (typeof (field) === 'object') {
            parsed = {
              name: field.name,
              title: (field.title === undefined) ? this.setTitle(field.name) : field.title,
              sortField: field.sortField,
              titleClass: (field.titleClass === undefined) ? '' : field.titleClass,
              dataClass: (field.dataClass === undefined) ? '' : field.dataClass,
              callback: (field.callback === undefined) ? null : field.callback,
              visible: (field.visible === undefined) ? true : field.visible
            }
          }

          this.fields.$set(key, parsed)
        })
      },
      renderField (item, field) {
        let callback = field.callback

        let value = this.extractObject(item, field.name)

        if (callback === null) {
          return value
        }

        if (typeof callback === 'string') {
          let args = callback.split('|')
          let func = args.shift()

          if (typeof this.$parent[func] === 'function') {
            return (args.length > 0)
              ? this.$parent[func]([value].concat(args))
              : this.$parent[func](value)
          }

          return null
        }

        if (typeof callback === 'function') {
          return callback.call(this, item)
        }
      },
      getData () {
        this.$http.get(this.routePath, { params: this.whitelistQuery })
          .then(response => {
            let data = response.data

            this.items = this.extractObject(data, 'data')
            this.pagination = this.extractObject(data, 'meta.pagination')

            this.notify('success', response)
          }, error => {
            this.notify('error', error)
          })
      }
    },
    events: {
      'rest-table-pagination:goToPage' (page) {
        let query = Object.assign(this.currentQuery, { page: page })

        this.$router.go({ path: this.routePath, query: query })
      }
    },
    created () {
      this.parsingFields()
    }
  }
</script>
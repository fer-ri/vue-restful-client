<template lang="jade">
  div.pagination-info.pull-left
    | Total {{ pagination.total }} items

  ul.pagination.pull-right(v-if="totalPages > 1")
    li.previous(v-bind:class="{ 'disabled': currentPage === 1 }")
      a(v-on:click.stop="goToPreviousPage") Previous
    li(v-for="item in pages", v-bind:class="{ 'active': currentPage === item.number }")
      a(v-on:click.stop="goToPage(item.number)") {{ item.text }}
    li.next(v-bind:class="{ 'disabled': currentPage === totalPages }")
      a(v-on:click.stop="goToNextPage") Next
</template>

<style lang="sass" scoped>
  .pagination-info
    margin: 20px 0;
    line-height: 33px;

  ul.pagination li:not(.disabled) a
    cursor: pointer;
</style>

<script>
  export default {
    props: {
      pagination: {
        type: Object,
        required: true
      },
      maxSize: {
        type: Number,
        default: 2
      }
    },
    data () {
      return {
        startPage: 1,
        endPage: this.totalPages,
        pages: []
      }
    },
    ready () {
      this.getPages()
    },
    computed: {
      currentPage () {
        return this.pagination.current_page
      },
      totalPages () {
        return this.pagination.total_pages
      }
    },
    methods: {
      makePage (number, text) {
        return {
          number,
          text
        }
      },
      getPages () {
        if (this.maxSize < this.totalPages) {
          this.startPage = Math.max(this.currentPage - Math.floor(this.maxSize / 2), 1)
          this.endPage = this.startPage + this.maxSize - 1

          if (this.endPage > this.totalPages) {
            this.endPage = this.totalPages
            this.startPage = this.endPage - this.maxSize + 1
          }
        }

        for (let number = this.startPage; number <= this.endPage; number++) {
          this.pages.push(this.makePage(number, number))
        }

        if (this.startPage > 1) {
          if (this.startPage > 2) {
            let previousPageSet = this.makePage(false, '...')

            this.pages.unshift(previousPageSet)
          }

          let firstPageLink = this.makePage(1, 1)

          this.pages.unshift(firstPageLink)
        }

        if (this.endPage < this.totalPages) {
          if (this.endPage < this.totalPages - 1) {
            let nextPageSet = this.makePage(false, '...')

            this.pages.push(nextPageSet)
          }

          let lastPageLink = this.makePage(this.totalPages, this.totalPages)

          this.pages.push(lastPageLink)
        }
      },
      goToPreviousPage () {
        if (this.pagination.links.previous) {
          this.$dispatch('rest-table-pagination:goToPage', this.pagination.current_page - 1)
        }
      },
      goToNextPage () {
        if (this.pagination.links.next) {
          this.$dispatch('rest-table-pagination:goToPage', this.pagination.current_page + 1)
        }
      },
      goToPage (page) {
        if (this.pagination.current_page !== page && page > 0) {
          this.$dispatch('rest-table-pagination:goToPage', page)
        }
      }
    }
  }
</script>
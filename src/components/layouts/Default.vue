<template lang="jade">
  app-header
  app-sidebar
  app-content
    router-view
</template>

<script>
  import Header from './Header'
  import Sidebar from './Sidebar'
  import Content from './Content'

  export default {
    components: {
      appHeader: Header,
      appSidebar: Sidebar,
      appContent: Content
    }
  }
</script>
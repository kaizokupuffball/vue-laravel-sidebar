<script>
import Vue from 'vue';
import VueLaravelSidebar from '@/vue-laravel-sidebar.vue';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueLaravelSidebar
  }
});
</script>

<template>
  <div id="app">
    <vue-laravel-sidebar :nav-data="[
      { 
        text: 'Home', 
        url: '/', 
        dropdown: false, 
        icon: 'fas fa-fw fa-tachometer-alt'
      },
      { 
        text: 'Items', 
        url: '#',  
        icon: 'fas fa-fw fa-database',
        dropdown: [
          {
            text: 'Item 1',
            url: '/item-1'
          }, {
            text: 'Item 2',
            url: '/item-2'
          }
        ],
      }
    ]" />
  </div>
</template>

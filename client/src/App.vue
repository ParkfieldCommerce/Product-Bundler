<template>
  <v-app>
    <v-content>
      <v-container>
        <div id="app">
          <MainNavigation/>
          <router-view/>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
import MainNavigation from '@/components/MainNavigation.vue';

export default {
  components: {
    MainNavigation,
  },
};
</script>

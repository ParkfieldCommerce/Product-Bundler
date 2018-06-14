<template>
  <v-app>
    <v-content>
      <v-container>
        <div id="app">
          <MainNavigation/>
          <div id="nav">
asdfasdfs
          </div>
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

<template>
  <v-toolbar color="light-blue darken-2" dark>
    <v-toolbar-title>Shopify Box Builder</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/">Home</v-btn>
      <v-btn flat to="/about">About</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'MainNavigation',
  props: {
    msg: String,
  },
  mounted() {
    console.log('mounted');
  },
};
</script>

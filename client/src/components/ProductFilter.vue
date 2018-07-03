<template>
  <v-select
    v-model="selected"
    label="Select"
    single-line
    :items="options"
    item-text="text"
    item-value="value"
    @change="updateFilters"
  >
  </v-select>
</template>

<script>
export default {
  data() {
    return {
      selected: `${this.category}_all`,
    };
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateFilters(e) {
      this.$store.commit('updateFilters', e);
    },
  },
};
</script>

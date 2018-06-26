<template>
  <select v-model="selected" class="Filter" @change="updateFilters">
    <option :value="category+'_all'" selected>All {{category}}s</option>
    <option v-for="option in options" :value="option">{{option | filterValue}}</option>
  </select>
</template>

<script>
export default {
  data(){
    return{
      selected:`${this.category}_all`
    }
  },
  props:{
    options:{
      type: Array,
      required: true
    },
    category:{
      type: String,
      required: true
    }
  },
  methods:{
    updateFilters(e){
      this.$store.commit('updateFilters', e.target.value );
    }
  }
};
</script>
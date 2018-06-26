<template>
  <div class="PageBar">
    <button @click="updatePage(1)" :class="[currentpage >= 1 ? 'active' : '', {notActive: currentpage != 1}]">
      1. Select Main Product
    </button>
    <button @click="updatePage(2)" :class="[currentpage >= 2 ? 'active' : '', {notActive: currentpage != 2}]">
      2. Select Addon Products
    </button>
    <button @click="updatePage(3)" :class="[currentpage == 3 ? 'active' : '', {notActive: currentpage != 3}]">
      3. Select & Write Card
    </button>
  </div>
</template>

<script>
export default {
  props:{
    currentpage: Number
  },
  methods:{
    updatePage(pageNumber){
      if(pageNumber == 1){
        this.$emit('changepage', pageNumber);
      }
      if(pageNumber == 2) {
        this.$emit('changepage', pageNumber);
      }
      if(pageNumber == 3) {
        this.$emit('changepage', pageNumber);
      }
    }
  }
};
</script>
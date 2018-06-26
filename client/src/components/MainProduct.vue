<template>
  <div class="Product Product--main" :class="isSelected ? 'Product--selected' : ''">
    <img class="Product__image" :src="product | getProductImage">
    <p class="Product__title">{{product.title}}</p>
    <button class="Product__button" @click="selectProduct">{{buttonActionText}}</button>
  </div>
</template>

<script>
export default {
  props:{
    product:Object
  },
  computed:{
    buttonActionText(){
      return this.$store.getters.isSelectedMainProduct(this.product) ? 'Remove' : 'Select Bag';
    },
    isSelected(){
      return this.$store.getters.isSelectedMainProduct(this.product);
    }
  },
  methods:{
    selectProduct(){
      if(this.$store.state.selectedMainProduct.id == this.product.id){
        this.$store.commit('updateSelectedMainProduct',{});
      }else{
        this.$store.commit('updateSelectedMainProduct',this.product);
      }
    }
  }
};
</script>
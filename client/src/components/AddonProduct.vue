<template>
  <div class="Product Product--addon" :class="isSelected ? 'Product--selected' : ''">
    <img class="Product__image" :src="product | getProductImage">
    <p class="Product__title">{{product.title}}</p>
    <button class="Product__button" @click="selectProduct">{{buttonActionText}}</button>
    <div class="Product__quantity">
      <button class="Product__quantity-btn" @click="updateQuantity(true)">+</button>
      <span class="Product__quantity-value">{{quantity}}</span>
      <button class="Product__quantity-btn" @click="updateQuantity(false)">-</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      added: false,
      quantity: 1
    }
  },
  props:{
    product:Object
  },
  computed:{
    isSelected(){
      return this.$store.getters.isSelectedAddonProduct(this.product);
    },
    buttonActionText(){
      return this.added ? 'Added' : 'Add';
    }
  },
  methods:{
    selectProduct(){
      this.$store.commit('updateSelectedAddonProducts',{product: this.product, quantity: parseInt(this.quantity) });
      this.added = true;
      setTimeout(()=>{
        this.added = false;
      },1500);
    },
    updateQuantity(increment){
      if(increment){
        this.quantity += 1;
      }else{
        if(this.quantity - 1 > 0){
          this.quantity -= 1;
        }
      }
    }
  }
}
</script>
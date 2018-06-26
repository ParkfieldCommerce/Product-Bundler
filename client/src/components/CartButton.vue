<template>
  <button @click="addToCart">
    {{buttonActionText}}
  </button>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return{
      isAdding: false
    }
  },
  computed:{
    buttonActionText(){
      return this.isAdding ? 'Building...' : 'Build my Bundle';
    }
  },
  methods:{
    addToCart(){
      let mainProduct = this.$store.state.selectedMainProduct;
      let addonProducts = this.$store.state.selectedAddonProducts;
      let cardProduct = this.$store.state.selectedCardProduct;
      let cartQueue = [];
      let boxKey = (Math.floor(Math.random() * 1000) + 1).toString();

      function ajaxAdd(queue){
        if(queue.length > 0){
          let currentItem = queue.pop();
          axios.post('/cart/add.js',currentItem)
          .then( response =>{
            ajaxAdd(queue);
          })
          .catch( err => {
            console.log(err);
          });
        }else{
          console.log('all done');
        }
      }
      if(mainProduct.variants){
        cartQueue.push({
          id:mainProduct.variants[0].id,
          quantity: 1,
          properties:{
            'BoxNum':boxKey
          }
        });
      }
      if(addonProducts.length > 0){
        addonProducts.forEach( addon => {
          cartQueue.push({
            id: addon.variants[0].id,
            quantity: addon.quantity,
            properties:{
              'BoxNum':boxKey
            }
          });
        });
      }
      if(cardProduct.variants){
        cartQueue.push({
          id:cardProduct.variants[0].id,
          quantity:1,
          properties:{
            'BoxNum':boxKey,
            'Message':cardProduct.message
          }
        });
      }
      this.isAdding = true;
      ajaxAdd(cartQueue);
    }
  }
};
</script>
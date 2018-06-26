<template>
  <div class="Product Product--card" :class="isSelected ? 'Product--selected' : ''">
    <img class="Product__image" :src="product | getProductImage">
    <p class="Product__title">{{product.title}}</p>
    <button class="Product__button" @click="selectProduct">{{buttonActionText}}</button>
    <div v-if="popupIsActive" class="Product__card-popup">
      <span class="Product__card-popup__overlay" @click="closePopup"></span>
      <div class="Product__card-popup__content">
        <img class="Product__card-popup__image" :src="product | getProductImage">
        <h3 class="Product__card-popup__heading">Write your card</h3>
        <p class="Product__card-popup__body"></p>
        <textarea v-if="!isBlank" v-model="message" name="message" cols="30" rows="5"></textarea>
        <label for="BlankCard">Click here if you want your card blank</label>
        <input name="BlankCard" type="checkbox" v-model="isBlank" @change="clearMessage"/>
        <button @click="updateMessage">All Set</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    product:Object
  },
  data(){
    return{
      popupIsActive: false,
      message:'',
      isBlank: false
    }
  },
  computed:{
    buttonActionText(){
      return this.$store.getters.isSelectedCardProduct(this.product) ? 'Edit' : 'Select Card';
    },
    isSelected(){
      return this.$store.getters.isSelectedCardProduct(this.product);
    }
  },
  methods:{
    selectProduct(){
      this.popupIsActive = true;
      this.$store.commit('updateSelectedCardProduct',this.product);
    },
    clearMessage(event){
      if(this.isBlank){
        this.message = '';
      }
    },
    updateMessage(){
      this.$store.commit('updateSelectedCardMessage', this.message);
      this.closePopup();
    },
    closePopup(){
      this.popupIsActive = false;
    }
  }
};
</script>
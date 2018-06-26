export default {
    isSelectedMainProduct(state){
        return (product) =>{
            return state.selectedMainProduct.id === product.id;
        }
        },
        isSelectedCardProduct(state){
        return (product) =>{
            return state.selectedCardProduct.id === product.id;
        }
        },
        isSelectedAddonProduct(state){
        return (product) =>{
            let found = false;
            for(let i = 0; i < state.selectedAddonProducts.length; i++){
            if(state.selectedAddonProducts[i].id === product.id){
                found = true;
                break;
            }
            }
            return found;
        }
        },
        addonProducts(state){
        if(state.selectedFilters.length == 0){
            return state.addonProducts;
        }

        //If the number of active filters is equal to the number of filters set to 'show all', the filters are inactive
        let showAllCheck = state.selectedFilters.filter( filter => filter.indexOf('_all') > -1 );
        let isFiltered = state.selectedFilters.length != showAllCheck.length;

        if(isFiltered){
            let activeFilters = state.selectedFilters.filter( filter => filter.indexOf('_all') === -1 );
            //Returns the product if its tags contains the value of ALL the active filters
            return state.addonProducts.filter( product => {
            let pass = true;
            for(let i = 0; i < activeFilters.length; i++){
                if(product.tags.indexOf(activeFilters[i]) === -1){
                pass = false;
                break;
                }
            }
            return pass;
            });
        }else{
            return state.addonProducts;
        }
        },
        cardProducts(state){
        if(state.selectedFilters.length == 0){
            return state.cardProducts;
        }

        //If the number of active filters is equal to the number of filters set to 'show all', the filters are inactive
        let showAllCheck = state.selectedFilters.filter( filter => filter.indexOf('_all') > -1 );
        let isFiltered = state.selectedFilters.length != showAllCheck.length;

        if(isFiltered){
            let activeFilters = state.selectedFilters.filter( filter => filter.indexOf('_all') === -1 );
            //Returns the product if its tags contains the value of ALL the active filters
            return state.cardProducts.filter( product => {
            let pass = true;
            for(let i = 0; i < activeFilters.length; i++){
                if(product.tags.indexOf(activeFilters[i]) === -1){
                pass = false;
                break;
                }
            }
            return pass;
            });
        }else{
            return state.cardProducts;
        }
        },
        totalBuildPrice(state){
        let totalPrice = 0;
        let mainProduct = state.selectedMainProduct;
        let addonProducts = state.selectedAddonProducts;
        let cardProduct = state.selectedCardProduct;

        function priceToInt(product){
            return parseInt(product.variants[0].price.replace('.',''));
        }

        function intToPrice(price){
            return `$${(price / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
        }

        if(mainProduct.variants){
            totalPrice += priceToInt(mainProduct);
        }

        if(addonProducts.length > 0){
            addonProducts.forEach(addon =>{
            totalPrice += priceToInt(addon) * addon.quantity;
            });
        }

        if(cardProduct.variants){
            totalPrice += priceToInt(cardProduct);
        }

        return intToPrice(totalPrice);
        }
};

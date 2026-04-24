import { defineStore } from 'pinia'

export const cartStore = defineStore('cart',{
  persist: true,
  state: () => ({quantity:0,product:[]}),
  getters: {
    total: (state) => state.product.reduce((acc, item) => acc +  parseFloat(item.price * item.quantity), 0),
    count: (state) => state.product.length
  },
  actions:
  {
    addProduct(product){
      // this.product.push({...product, quantity:1 });
      const found = this.product.find(({id})=>id === product.id)

      if (found){
        found.quantity++
      }
      else {
        this.product.push({...product, quantity:1});
      }
    },
    increment(productId){
      const finder = this.product.find(item=>item.id === productId);
      if (finder){
        finder.quantity++
      }
    },
    decrement(productId){
      const finder = this.product.find(item=>item.id === productId);
      if(finder){
        finder.quantity--
        if(finder.quantity<=0){
          this.product = this.product.filter(item => item.id !== productId)
        }
      }
    },
  }
}
);

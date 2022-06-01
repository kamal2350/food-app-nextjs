import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        cartQuantity:0,
        total:0,
    },
    reducers:{
        addProduct:(state, action)=>{
            state.products.push(action.payload);
            state.cartQuantity+=1;
            state.total+=action.payload.price * action.payload.count;

        },
        resetProduct:(state)=>{
            state.products=[];
            state.cartQuantity=0;
            state.total=0;
        }
    }
});
export const {addProduct,resetProduct} =cartSlice.actions;
export default cartSlice.reducer;
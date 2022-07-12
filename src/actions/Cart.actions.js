import axios from "../helpers/axios";
import { cartConstant } from "./Constants";


export const updateCart=(item)=>{
    return async dispatch =>{

        dispatch({type:cartConstant.UPDATE_CART_REQUEST});

        await axios.post('/update-cart',{item})
        // const res=await axios.post('/update-cart',{item}) 
        // console.log(res);
        // if(res.status===200){

        //     const {products }=res.data

        //     dispatch({
        //         type:cartConstant.UPDATE_CART_SUCCESS,
        //         payload:{products:products}
        //     })
        // }else{
        //     dispatch({
        //         type:cartConstant.UPDATE_CART_FAILURE,
        //         payload:{error:res.data.error}
        //     })
        // }
    }
}
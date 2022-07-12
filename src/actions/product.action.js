import axios from "../helpers/axios";
import { productConstant } from "./Constants";


export const getAllProducts=()=>{
    return async dispatch =>{

        dispatch({type:productConstant.GET_ALL_PRODUCTS_REQUEST});

        const res=await axios.get('/product/getproduct') 
        if(res.status===200){

            const {products }=res.data

            dispatch({
                type:productConstant.GET_ALL_PRODUCTS_SUCCESS,
                payload:{products:products}
            })
        }else{
            dispatch({
                type:productConstant.GET_ALL_PRODUCTS_FAILURE,
                payload:{error:res.data.error}
            })
        }
    }
}

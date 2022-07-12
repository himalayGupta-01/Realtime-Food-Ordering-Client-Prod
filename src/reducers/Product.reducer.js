import { productConstant } from "../actions/Constants";


// done by videos
const initialState = {
    products: []
}

const productReducer=(state = initialState, action) => {
    switch (action.type) {
        case productConstant.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products
            }
            break;
            default: break;
    }
    return state;
}

export default productReducer;



// done by me to display added product immediately
// const initialState = {
//     products: [],
//     loading: false,
//     error: null
// }

// const showProducts = (products, product, categories) => {

//     let newProducts = [];
//     for (let prod of products) {
//         newProducts.push({
//             ...prod
//         })
//     }

//     categories.forEach((cat) => {
//         if (cat._id === product.category) {
//             let category = {
//                 _id: cat._id,
//                 name: cat.name
//             }
//             product.category = category;
//         }
//     })

//     newProducts.push({
//         ...product
//     });
//     return newProducts;
// }

// export default (state = initialState, action) => {
//     switch (action.type) {
//         case productConstant.GET_ALL_PRODUCTS_SUCCESS:
//             state = {
//                 ...state,
//                 products: action.payload.products
//             }
//             break;


//         case productConstant.ADD_NEW_PRODUCT_REQUEST:
//             state = {
//                 ...state,
//                 loading: true
//             }
//             break;
//         case productConstant.ADD_NEW_PRODUCT_SUCCESS:
//             state = {
//                 ...state,
//                 products: showProducts(state.products, action.payload.product, action.payload.categories),
//                 loading: false

//             }
//             break;
//         case productConstant.ADD_NEW_PRODUCT_FAILURE:
//             state = {
//                 ...initialState
//             }
//             break;
//     }
//     return state;
// }
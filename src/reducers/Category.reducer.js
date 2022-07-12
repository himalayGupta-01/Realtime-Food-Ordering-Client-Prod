import { categoryConstant } from "../actions/Constants";

const initState={
    categories:[],
    loading:false,
    error:null
};
const showCategories=(categories,category)=>{
    let newCategories=[];
    for(let cat of categories){
        newCategories.push({
           ...cat
        })
    }
    newCategories.push({
        ...category
    });
    return newCategories;
}

const CategoryReducer=(state=initState,action)=>{
    switch(action.type){
        case categoryConstant.GET_ALL_CATEGORIES_SUCCESS:
            state={
                ...state,
                categories:action.payload.categories
            }
            break;
        case categoryConstant.ADD_NEW_CATEGORY_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case categoryConstant.ADD_NEW_CATEGORY_SUCCESS:
            state={
                ...state,
                categories:showCategories(state.categories,action.payload.category),
                loading:false

            }
            break;
        case categoryConstant.ADD_NEW_CATEGORY_FAILURE:
            state={
                ...initState
            }
            break;
            default: break;
    }
    return state;
}

export default CategoryReducer
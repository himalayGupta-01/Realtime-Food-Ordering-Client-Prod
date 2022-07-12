import React, { useEffect } from 'react'
import axios from 'axios'
import heroPic from "../images/food4.jpg"
// import heroPic2 from "../images/pizza.png"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from "react-redux"
import { getAllCategory, getAllProducts } from "../actions/Action"
import { generatePublicUrl } from '../urlConfig';
// import { updateCart } from '../actions/Cart.actions';
// import { getOrderById } from '../actions/Order.actions';



const Home = () => {

    //done by me
    const categoryState = useSelector(state => state.category);
    const productState = useSelector(state => state.product)
    // const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();
    let cartCounter = document.querySelector('#cartCounter')

    const getProductByCategoryId = (categoryId) => {
        let prod = [];
        for (let product of productState.products) {
            if (product.category === categoryId)
                prod.push({
                    ...product
                })
        }
        return prod;
    }

    const makeMenu = () => {

        let finalData = []
        for (let category of categoryState.categories) {

            let products = getProductByCategoryId(category._id)
            finalData.push({
                ...category,
                products: products
            })

        }
        return finalData;
    }

    useEffect(() => {
        dispatch(getAllCategory());
        dispatch(getAllProducts());
        // dispatch(getOrderById(auth.user._id));
    }, [dispatch])



    function updateCart(item) {
        console.log(item);
        axios.post('https://realtime-food-ordering.herokuapp.com/update-cart', item).then(res => {
            localStorage.setItem("cart", JSON.stringify(res.data.session.cart))
            cartCounter.innerText = res.data.totalQty;
        })
    }

    const handleInput = (item) => {
        updateCart(item)
        toast.success("Product Added", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }


    let menuSection = document.querySelector('.menu')

    const moveToMenu = () => {
        menuSection.scrollIntoView({ behavior: 'smooth' });
    }


    return (
        <>
            <section className="hero py-5">
                <div className=" container mx-auto flex items-center justify-between">
                    <div className=" px-32 w-1/2">
                        <h6 className=" text-lg pb-4"><em>Are you hungry?</em></h6>
                        <h1 className=" text-6xl font-bold">Don't wait !!</h1>
                        <button className="px-6 py-2 rounded-full text-white font-bold mt-4 btn-primary" onClick={() => moveToMenu()}>Order Now</button>
                    </div>
                    <div className=" w-1/2">
                        <img className="heroPic" src={heroPic} alt="hero pic" />
                    </div>
                </div>
            </section>

            <section className="hero py-5">
                <div className="menu container mx-auto py-8">
                    {makeMenu().map((category) => {
                        return (
                            <div key={category._id}>
                                <br />
                                <h1 className="text-xl font-bold mb-8">{category.name}</h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-16">
                                    {category.products.map(product => {
                                        return (<div key={product._id} className="w-full md:w-64">
                                            <img className="h-40 mb-4 mx-auto" src={generatePublicUrl(product.productPicture)} alt="" />
                                            <div className="text-center">
                                                <h2 className="mb-4 text-lg">{product.name}</h2>
                                                <span className="size py-1 px-4 rounded-full uppercase text-xs">{product.description}</span>
                                                <div className="flex items-center justify-around mt-6">
                                                    <span className="font-bold text-lg">₹{product.price}</span>
                                                    <button onClick={() => handleInput(product)}
                                                        className="add-to-cart py-1 px-6 rounded-full flex items-center font-bold">
                                                        <span>+</span>
                                                        <span className="ml-4">Add</span>
                                                    </button>
                                                    {/* <ToastContainer /> */}
                                                </div>
                                            </div>
                                        </div>)
                                    })
                                    }
                                </div>

                            </div>)
                    })}
                </div>
            </section>
        </>
    )
}

export default Home

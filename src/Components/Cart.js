import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa';
import EmptyCart from "../images/empty-cart.png"
import CartIcon from "../images/cart-black.png"
import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import { generatePublicUrl } from "../urlConfig"
import { takeOrder } from '../actions/Order.actions';

const Cart = () => {

    const auth = useSelector(state => state.auth)
    const order = useSelector(state => state.order)

    const dispatch = useDispatch();

    //getting full cart from session
    const [cart, setCart] = useState({
        ...JSON.parse(localStorage.getItem("cart"))
    })
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("")
    const [error, setError] = useState(null);
    const [showOrderPlaced, setShoWOrderPlaced] = useState(false);
    const history = useHistory();


    let cartCounter = document.querySelector('#cartCounter')


    useEffect(() => {
        if (order.message === "Order Placed SuccessFully") {
            setShoWOrderPlaced(true);
            setTimeout(() => {
                history.push({
                    pathname: "/my-orders",
                    state: {
                        from: "cart"
                    }
                })
                axios.post(`${process.env.REACT_APP_SERVER_PROD}delete-cart`,{withCredentials:true}).then(res => {
                    localStorage.removeItem("cart");
                    localStorage.setItem("cart", JSON.stringify({ items: {}, totalPrice: 0, totalQty: 0 }))
                    setCart({
                        ...JSON.parse(localStorage.getItem("cart"))
                    })
                    cartCounter.innerText = "";
                })
            }, 3000)


        }
    }, [order, history, cartCounter]);

    useEffect(() => {
        if (order.error && order.error.split("**")[1] !== "Failed to Login")
            setError({
                type: order.error.split("**")[0],
                value: order.error.split("**")[1]
            })
        else {
            setError(null)
        }
    }, [order]);

    useEffect(() => {
        setError(null)
    }, [phone, address]);

    //incrementing value of a item in cart
    const increment = (item) => {
        axios.post(`${process.env.REACT_APP_SERVER_PROD}increase-cart`, item,{withCredentials:true}).then(res => {
            localStorage.removeItem("cart");
            localStorage.setItem("cart", JSON.stringify(res.data.session.cart))
            setCart({
                ...JSON.parse(localStorage.getItem("cart"))
            })
            cartCounter.innerText = res.data.totalQty === 0 ? "" : res.data.totalQty;
        })
    }

    //decrementing value of a item in cart
    const decrement = (item) => {
        axios.post(`${process.env.REACT_APP_SERVER_PROD}decrease-cart`, item,{withCredentials:true}).then(res => {
            localStorage.removeItem("cart");
            localStorage.setItem("cart", JSON.stringify(res.data.session.cart))
            setCart({
                ...JSON.parse(localStorage.getItem("cart"))
            })
            cartCounter.innerText = res.data.totalQty === 0 ? "" : res.data.totalQty;
        })
    }

    // removing item from cart
    const removeItem = (item) => {
        axios.post(`${process.env.REACT_APP_SERVER_PROD}remove-from-cart`, item,{withCredentials:true}).then(res => {
            localStorage.removeItem("cart");
            localStorage.setItem("cart", JSON.stringify(res.data.session.cart))
            setCart({
                ...JSON.parse(localStorage.getItem("cart"))
            })
            cartCounter.innerText = res.data.totalQty === 0 ? "" : res.data.totalQty;
        })
    }

    //order items in cart
    const orderCart = async () => {
        const order = {
            user: auth.user._id,
            items: { ...cart },
            phone,
            address
        }
        await dispatch(takeOrder(order));

    }

    //displaying the cart
    const renderCart = () => {
        if (!cart.items) {
            return <></>;
        }

        let totalCart = []

        Object.entries(cart.items).forEach(item => {
            Object.entries(item[1]).forEach(itemValue => {
                if (itemValue[0] === "item") {
                    totalCart.push({
                        item: {
                            ...itemValue[1]
                        },
                        quantity: item[1].qty
                    })
                }
            })
        })

        return (<>
            {totalCart.map(val =>
                <div key={val._id} className=" flex items-center my-8 justify-between">
                    <div className="flex items-center">
                        <img className="w-24" src={generatePublicUrl(val.item.productPicture)} alt="" />
                        <div className="flex-1 ml-4" >
                            <h1>{val.item.name}</h1>
                            <span>MEDIUM</span>
                        </div>
                    </div>
                    <span className="add-minus-quantity"
                    >
                        <button onClick={() => decrement(val.item)}><FaMinus /></button>
                        {/*<input type="text" value={val.quantity} />*/}
                        <span style={{ fontSize: "large", fontWeight: "600", margin: "10px" }}>{val.quantity}</span>
                        <button onClick={() => increment(val.item)}><FaPlus /></button>
                    </span>
                    <div className="font-bold text-lg">₹{val.item.price}</div>
                    <div className="font-bold text-lg">₹{(Number(val.item.price) * Number(val.quantity))}</div>
                    <span className="remove-item">
                        <button onClick={() => removeItem(val.item)}><FaTrashAlt /></button>
                    </span>
                </div>
            )}

        </>)

    }

    return (
        <>
            <section className="cart py-16">
                {showOrderPlaced ?
                    <div style={{ width: "40%", margin: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                        <h1 class="successfullOrder">Order Placed Successfully</h1>
                    </div>
                    :
                    <>
                        {cart.items && cart.totalQty !== 0 ? <>
                                <div className=" order container mx-auto w-1/2">
                                    <div className="flex items-center border-b border-gray-300 pb-4">
                                        <img src={CartIcon} alt="cart-icon" />
                                        <h1 className=" font-bold ml-4 text-2xl">Order Summary</h1>
                                    </div>
                                    <div className="order-list">
                                        {renderCart()}
                                    </div>
                                    <hr />
                                    <div className="text-right py-5">
                                        <div>
                                            <span className="text-lg font-bold">Total Amount:</span>
                                            <span className="amount text-2xl font-bold ml-2">₹{cart.totalPrice}</span>
                                        </div>

                                        {
                                            auth.authenticate ? <div>
                                                <form className="mt-12" action="">
                                                    <input className="border border-gray-400 p-2 w-1/2 mb-2"
                                                        type="number"
                                                        placeholder="Phone Number"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                    />

                                                    {error ? error.type === "Phone" ?
                                                        <div className="anyError">{error.value}</div>
                                                        : "" : ""
                                                    }
                                                    <br />
                                                    <input className="border border-gray-400 p-2 w-1/2 mb-2"
                                                        type="text"
                                                        placeholder="Address"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                    />
                                                    {error ? error.type === "Address" ?
                                                        <div className="anyError ">{error.value}</div>
                                                        : "" : ""
                                                    }
                                                </form>

                                                <button className="btn-primary px-6 py-2 rounded-full text-white font-bold mt-6" onClick={orderCart}>Order Now</button>
                                            </div> :
                                                <>
                                                    <NavLink className=" cart-login inline-block cursor-pointer px-6 py-2 rounded-full btn-primary text-white font-bold mt-6" to="/signin">Login to Continue</NavLink>
                                                </>
                                        }
                                    </div>
                                </div>
                            </>
                                : <>
                                    {/* ------------------------------empty cart section -----------------------------------*/}
                                    <div className="empty-cart ">
                                        <div className="container mx-auto text-center">
                                            <h1 className=" text-3xl font-bold mb-2">Cart Empty 🙁</h1>
                                            <p className="text-gray-500 text-lg mb-12">You Probably haven't ordered a yet. <br />
                                                To order a Dish, go to the main page</p>
                                            <img className=" w-1/3 mx-auto" src={EmptyCart} alt="empty cart" />
                                            <NavLink className=" cart-home inline-block px-6 py-2 rounded-full btn-primary text-white font-bold mt-12" to="/">Go back</NavLink>
                                        </div>
                                    </div>
                                </>
                        }
                    </>
                }

            </section>
        </>
    )
}

export default Cart

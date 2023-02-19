import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa';
import logo from '../images/3697355.png'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../actions/Auth.actions'
import axios from "axios"

const Navbar = () => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signout())
    }
    const [cartValue, setCartValue] = useState("");

    useEffect(() => {
        axios.get('https://realtime-food-ordering-server.onrender.com/cart').then(async res => {
            localStorage.setItem("cart", JSON.stringify(res.data.session.cart))
            await setCartValue(res.data.totalQty);
        })

    }, [])


    return (
        <>
            <nav className=" container mx-auto flex items-center justify-between ">
                <div>
                    <NavLink className="logo-link" to="/"> <img src={logo} alt="logo" /> </NavLink>
                </div>
                <div>
                    <ul className=" flex items-center font-bold">
                        <li className=" ml-6">
                            <NavLink exact activeClassName="nav-link active" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className=" ml-6">
                            <NavLink activeClassName="nav-link active" to="/contact">Contact</NavLink>
                        </li>

                        {auth.authenticate ?
                            <>
                                <li className=" ml-6">
                                    <NavLink activeClassName="nav-link active" to="/my-orders">My Orders</NavLink>
                                </li>
                                <li className=" ml-6">
                                    <span style={{ cursor: "pointer" }} className="nav-link" onClick={logout}>Signout</span>
                                </li>

                            </>
                            :
                            <>
                                <li className=" ml-6">
                                    <NavLink activeClassName="nav-link active" to="/signin">Login</NavLink>
                                </li>
                                <li className=" ml-6">
                                    <NavLink activeClassName="nav-link active" to="/signup">SignUp</NavLink>
                                </li>
                            </>
                        }

                        <li className=" ml-6 ">
                            <NavLink className="nav-link px-4 py-2 rounded-full flex items-center " id='cart-icon' to="/cart"><span id='cartCounter'>{cartValue === 0 ? "" : cartValue}</span><FaShoppingCart /></NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

        </>
    )
}

export default Navbar

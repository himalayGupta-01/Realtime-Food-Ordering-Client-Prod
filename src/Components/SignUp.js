import React, { useState, useEffect } from "react";
import { NavLink, useHistory, Redirect } from 'react-router-dom';
import { FaUserAlt, FaEnvelope, FaPhoneAlt, FaUnlockAlt } from 'react-icons/fa';
import signUpPic from "../images/signup.png";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../actions/User.actions'

const SignUp = () => {

    const auth = useSelector(state => state.auth);
    const userStore = useSelector(state => state.user);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        name: "", email: "", phone: "", password: "", cpassword: ""
    });

    const history = useHistory();
    const dispatch = useDispatch()


    useEffect(() => {
        if (userStore.message === "User registered successfully") {
            history.push("/signin")
        }
    }, [userStore, history]);


    useEffect(() => {
        if (userStore.error && userStore.error.split("**")[1] !== "Failed to Login")
            setError({
                type: userStore.error.split("**")[0],
                value: userStore.error.split("**")[1]
            })
        else
            setError(null)
    }, [userStore]);

    useEffect(() => {
        setError(null)
    }, [user]);

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({ ...user, [name]: value });
    };

    const PostData = async (e) => {
        e.preventDefault();
        await dispatch(signup(user));
    }

    if (auth.authenticate) {
        return <Redirect to="/" />
    }

    return (
        <>
            <section className="signup py-5">
                <div className="shadow-2xl container mx-auto flex justify-center items-center">

                    <div className="left max-w-xs w-1/2">
                        <form method="POST" className="bg-white shadow-md rounded px-4 pt-6 pb-6 mb-4 mt-4">

                            <div className="mb-4">
                                <label className=" text-gray-700 text-sm font-bold mb-2 flex" htmlFor="name">
                                    <FaUserAlt /> <span className=" px-3">Name</span>
                                </label>
                                <input className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" id="name" type="text" autoComplete="off" value={user.name} onChange={handleInput} placeholder="Enter your Name" />
                                {error ? error.type === "Name" ?
                                    <div className="anyError mb-6">{error.value}</div>
                                    : "" : ""
                                }
                            </div>


                            <div className="mb-4">
                                <label className=" text-gray-700 text-sm font-bold mb-2 flex" htmlFor="email">
                                    <FaEnvelope /> <span className=" px-3">Email</span>
                                </label>
                                <input className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" id="email" type="email" autoComplete="off" value={user.email} onChange={handleInput} placeholder="Enter your Email" />
                                {error ? error.type === "Email" ?
                                    <div className="anyError mb-6">{error.value}</div>
                                    : "" : ""
                                }
                            </div>


                            <div className="mb-4">
                                <label className=" text-gray-700 text-sm font-bold mb-2 flex" htmlFor="phone">
                                    <FaPhoneAlt /> <span className=" px-3">Phone Number</span>
                                </label>
                                <input className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="phone" id="phoneNumber" type="number" autoComplete="off" value={user.phone} onChange={handleInput} placeholder="Enter your Phone number" />
                                {error ? error.type === "Phone" ?
                                    <div className="anyError mb-6">{error.value}</div>
                                    : "" : ""
                                }
                            </div>


                            <div className="mb-4">
                                <label className=" text-gray-700 text-sm font-bold mb-2 flex" htmlFor="password">
                                    <FaUnlockAlt /> <span className=" px-3">Password</span>
                                </label>
                                <input className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="password" id="password" type="password" value={user.password} onChange={handleInput} placeholder="**********" />
                                {error ? error.type === "Password" ?
                                    <div className="anyError mb-6">{error.value}</div>
                                    : "" : ""
                                }
                            </div>


                            <div className="mb-1">
                                <label className=" text-gray-700 text-sm font-bold mb-2 flex" htmlFor="password">
                                    <FaUnlockAlt /> <span className=" px-3">Confirm Password</span>
                                </label>
                                <input className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="cpassword" id="cpassword" type="password" value={user.cpassword} onChange={handleInput} placeholder="**********" />
                                {error ? error.type === "Confirm Password" ?
                                    <div className="anyError mb-6">{error.value}</div>
                                    : "" : ""
                                }
                            </div>

                            {error ? error.type === "Server" ?
                                <div className="anyError mb-6">{error.value}
                                </div>
                                : "" : ""
                            }


                            <div className="flex items-center justify-between">
                                <button className=" btn-primary rounded-full text-white font-bold py-2 px-4 focus:shadow-outline" name="signup" value="signup" onClick={PostData} type="button">
                                    Sign Up
                                </button>
                                <ToastContainer />
                                <NavLink className="inline-block align-baseline font-bold text-sm " to="/signin">
                                    Already have an account?
                                </NavLink>
                            </div>


                        </form>

                        <p className="text-center text-gray-500 text-xs">
                            &copy;2022 Foodiez Delivery All Rights Reserved.
                        </p>

                    </div>

                    <div className='signup-image max-w-lg w-1/2'>
                        <figure>
                            <img className="px-4" src={signUpPic} alt="registration pic" />
                        </figure>
                    </div>

                </div>

            </section>
        </>
    );
};

export default SignUp;

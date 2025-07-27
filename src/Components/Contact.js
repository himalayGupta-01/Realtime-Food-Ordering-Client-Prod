import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaUserAlt } from 'react-icons/fa';
import { sendMessage } from '../actions/Message.actions';
import { NavLink } from 'react-router-dom'

const Contact = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false)
    const auth = useSelector(state => state.auth);
    const messageState = useSelector(state => state.message)
    const [error, setError] = useState(null);
    const disptach = useDispatch()

    useEffect(() => {
        if (auth.authenticate) {
            setName(auth.user.name);
            setEmail(auth.user.email)
        }
    }, [auth]);

    useEffect(() => {
        if (messageState.message === "Message Sent successfully") {
            setShowSuccess(true);
            setMessage("");
        }
    }, [messageState, auth]);


    useEffect(() => {
        if (messageState.error && messageState.error.split("**")[1] !== "Failed to Login") {
            setError({
                type: messageState.error.split("**")[0],
                value: messageState.error.split("**")[1]
            })
            setShowSuccess(false);
        }

        else {
            setError(null);
        }
    }, [messageState]);

    useEffect(() => {
        setError(null)
        setShowSuccess(false)
    }, [name, email, message]);

    const sendMsg = () => {
        const messageFinal = { name, email, message }
        disptach(sendMessage(messageFinal))
        setTimeout(() => {
            setShowSuccess(false);
        }, 4000)
    }

    return (
        <>
            <section className="menu py-5">
                <div className="contact_info">
                    <div className="container mx-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-12 gap-y-16">
                            <div className="contact_info_item flex justify-evenly items-center shadow-lg">
                                <FaEnvelope />
                                <div className="contact_info_content ">
                                    <div className=" text-center contact_info_title">
                                        <b>Mail</b>
                                    </div>
                                    <div className="contact_info_text">
                                        <a className='text-green-600' href="mailto:akashagrawalecs@gmail.com">akashagrawalecs@gmail.com</a>
                                    </div>
                                    /*<div className="contact_info_text">
                                        <a className='text-green-600' href="mailto:himalay9644@gmail.com">himalay9644@gmail.com</a>
                                    </div>*/
                                </div>
                            </div>
                            <div className="contact_info_item flex justify-evenly items-center shadow-lg">
                                <FaMapMarkerAlt />
                                <div className="contact_info_content">
                                    <div className="text-center contact_info_title">
                                        <b>Address</b>
                                    </div>
                                    <div className="contact_info_text">
                                        <a href="https://www.google.com/maps/place/Gubbara+Phatak,+Dal+Bazaar,+Lashkar,+Gwalior,+Madhya+Pradesh+474009/@26.2000773,78.1567857,20.92z/data=!4m5!3m4!1s0x3976c42d4576848f:0x6eade78c7c3573be!8m2!3d26.2001253!4d78.1569395"> Gwalior, MP, India</a>
                                    </div>
                                </div>
                            </div>
                            <div className="contact_info_item flex justify-evenly items-center shadow-lg">
                                <FaPhoneAlt />
                                <div className="contact_info_content">
                                    <div className="text-emerald-400 text-center contact_info_title">
                                        <b>Phone</b>
                                    </div>
                                    /*<div className="contact_info_text">
                                        <a className='text-blue-600' href="tel:+91 8817 836 377">+91 8817 836 377</a>
                                    </div>*.
                                    <div className="contact_info_text">
                                        <a className='text-blue-600' href="tel:+91 9644 622 667">+91 9644 622 667</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="menu container mx-auto py-8">
                <div className="container mx-auto flex justify-center items-center">
                    <div className="left max-w-xl w-1/2">

                        <form method="POST" className="bg-white shadow-md rounded px-6 pt-6 pb-8 mb-4">

                            <div className="mb-6">
                                <label className=" text-gray-700 text-sm font-bold mb-2 flex" htmlFor="text"> <FaUserAlt /> <span className=" px-3">Name</span>
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" value={name}
                                    // onChange={(e) => setName(e.target.value)} 
                                    placeholder="Enter your Name" />
                                {error ? error.type === "Name" ?
                                    <div className="anyError mb-6">{error.value}</div>
                                    : "" : ""
                                }
                            </div>

                            <div className="mb-4">
                                <label className=" text-gray-700 text-sm font-bold mb-2 flex" htmlFor="email">
                                    <FaEnvelope /><span className=" px-3">Email</span>
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={email}
                                    // onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="Enter your email" />
                                {error ? error.type === "Email" ?
                                    <div className="anyError mb-6">{error.value}</div>
                                    : "" : <div className="mt-2">
                                    <span className="text-red-700 text-sm font-bold mb-2 flex">You will recieve your reply on this mail-id</span>
                                </div>
                                }

                            </div>

                            <div className="mt-8">
                                <span className="uppercase text-sm text-gray-600 font-bold">Message</span>
                                <textarea
                                    className="w-full h-32 bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                {error ? error.type === "Message" ?
                                    <div className="anyError mb-6">{error.value}</div>
                                    : "" : ""
                                }
                            </div>

                            <div className="flex items-center justify-center">
                                {auth.authenticate ? <>
                                    <button className=" btn-primary rounded-full text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline" type="button" onClick={sendMsg}>
                                        Send
                                    </button>
                                    {showSuccess ? <span className='flex flex-col justify-center items-center' style={{ width: "15%" }}>
                                        <svg class="checkmark_green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                            <circle class="checkmark__circle_green" cx="26" cy="26" r="25" fill="none" />
                                            <path class="checkmark__check_green" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                        </svg>
                                        <p className="successMessageSent">Sent</p>
                                    </span>
                                        : ""}
                                </>
                                    : <NavLink className=" cart-login inline-block cursor-pointer px-6 py-2 rounded-full btn-primary text-white font-bold mt-6" to="/signin">Login to Continue</NavLink>}
                            </div>


                        </form>
                    </div>
                </div>
            </section >


        </>
    )
}

export default Contact

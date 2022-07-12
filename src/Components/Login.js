import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FaUserAlt, FaUnlockAlt } from 'react-icons/fa';
import signInPic from '../images/login.png'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { login } from '../actions/Action'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
// import {getOrderById } from '../actions/Order.actions';


const Login = () => {

  // const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector(state => state.auth)
  const [error, setError] = useState(null);
  const dispatch = useDispatch()


  useEffect(() => {
    if (auth.error && auth.error.split("**")[1] !== "Failed to Login")
      setError({
        type: auth.error.split("**")[0],
        value: auth.error.split("**")[1]
      })
    else
      setError(null)
  }, [auth]);

  useEffect(() => {
    setError(null)
  }, [email, password])

  const loginUSer = async (e) => {
    e.preventDefault();
    const user = {
      email, password
    }
    await dispatch(login(user));
  }

  if (auth.authenticate) {
    return <Redirect to="/" />
  }

  return (
    <>
      <section className="login py-5">
        <div className="shadow-2xl container mx-auto flex justify-center items-center">
          <div className="left max-w-xs w-1/2">

            <form method="POST" className="bg-white shadow-md rounded px-6 pt-6 pb-8 mb-4">

              <div className="mb-4">
                <label className=" text-gray-700 text-sm font-bold mb-2 flex" htmlFor="email">
                  <FaUserAlt /> <span className=" px-3">Email</span>
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="email" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                {error ? error.type === "Email" ?
                  <div className="anyError mb-6">{error.value}</div>
                  : "" : ""
                }
              </div>


              <div className="mb-4">
                <label className=" text-gray-700 text-sm font-bold mb-2 flex" htmlFor="password">
                  <FaUnlockAlt /> <span className=" px-3">Password</span>
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="**********" />
                {error ? error.type === "Password" ?
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
                <button className=" btn-primary rounded-full text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline" type="button" onClick={loginUSer}>
                  Sign In
                </button>
                <ToastContainer />
                <NavLink className="inline-block align-baseline font-bold text-sm " to="/signup">
                  Don't have account?
                </NavLink>
              </div>


            </form>

            <p className="text-center text-gray-500 text-xs">
              &copy;2022 Foodiez Delivery All Rights Reserved.
            </p>

          </div>

          <div className="right max-w-xl signInPic w-1/2">
            <figure>
              <img className="px-6" src={signInPic} alt="Login Pic" />
            </figure>
          </div>

        </div>
      </section>
    </>
  )
}

export default Login

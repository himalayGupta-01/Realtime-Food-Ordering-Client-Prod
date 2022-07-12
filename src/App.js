import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom"
import "./App.css";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Contact from './Components/Contact';
import Cart from "./Components/Cart";
import Error from "./Components/Error";
import Footer from "./Components/Footer";
import MyOrders from "./Components/MyOrders";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn } from './actions/Auth.actions'
// import { getInitialData } from './actions/Action'
// import {io} from "socket.io-client";



axios.defaults.withCredentials = true;

function App() {

  // const socket=useRef();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  
  
  useEffect(() => {
  //   socket.current=io("http://localhost:8000")
  //   socket.current.on("connection",()=>{
  //     console.log("connected to server")
  //   })

    // socket.current.emit("message","data is mine this")

    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    // dispatch(getInitialData());
  }, [auth.authenticate, dispatch])

  

  return (
    <>
      <div className="page-container">

        <div className="content-wrap">

          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/signin">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/my-orders">
              <MyOrders />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>

            {/* <Route path="*" component={Home}/> */}
            {/* gave to remove it , can be used instead of 404 page*/}

            <Route>
              <Error />
            </Route>
          </Switch>
          <ToastContainer />
        </div>

        <Footer />

      </div>
    </>
  );
}

export default App;
